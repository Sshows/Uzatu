'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

function fail(message, code = 1) {
  process.stderr.write(`${message}\n`);
  process.exit(code);
}

function usage() {
  fail('Usage: node scripts/sqlite-state.js <save|load> <db-path> [state-json-path]');
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function ensureObject(value, fallback = {}) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : fallback;
}

function parseJson(text, fallback) {
  if (text === null || text === undefined || text === '') {
    return fallback;
  }

  try {
    return JSON.parse(text);
  } catch (_) {
    return fallback;
  }
}

function asBoolean(value) {
  return value === 1 || value === true;
}

function asNullableNumber(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function boolToInt(value) {
  return value ? 1 : 0;
}

function toJson(value) {
  return JSON.stringify(value ?? null);
}

function normalizeState(rawState) {
  const state = ensureObject(rawState, {});

  return {
    meta: ensureObject(state.meta, {}),
    users: ensureArray(state.users),
    sessions: ensureArray(state.sessions),
    logs: ensureArray(state.logs),
    alerts: ensureArray(state.alerts),
    incidents: ensureArray(state.incidents),
    rules: ensureArray(state.rules),
    audit: ensureArray(state.audit),
    settings: ensureObject(state.settings, {}),
    system: ensureObject(state.system, {})
  };
}

function openDatabase(dbPath) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const db = new DatabaseSync(dbPath);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA foreign_keys = OFF;
    PRAGMA busy_timeout = 5000;
  `);

  return db;
}

function ensureSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS app_meta (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT NOT NULL,
      version TEXT NOT NULL,
      mode TEXT NOT NULL,
      target_city TEXT,
      target_country TEXT,
      target_lat REAL,
      target_lon REAL
    );

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      simulation_interval_ms INTEGER NOT NULL,
      license_capacity_eps INTEGER NOT NULL,
      false_positive_tolerance INTEGER NOT NULL,
      max_logs INTEGER NOT NULL,
      sources_enabled_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS system_state (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      next_ids_json TEXT NOT NULL,
      last_tick_utc TEXT NOT NULL,
      theme TEXT NOT NULL,
      cooldowns_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      sort_order INTEGER NOT NULL,
      username TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL,
      display_name TEXT NOT NULL,
      password_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      sort_order INTEGER NOT NULL,
      user_id TEXT NOT NULL,
      expires_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS logs (
      id TEXT PRIMARY KEY,
      sort_order INTEGER NOT NULL,
      ts TEXT NOT NULL,
      source TEXT NOT NULL,
      type TEXT NOT NULL,
      severity TEXT NOT NULL,
      category TEXT NOT NULL,
      ip TEXT,
      user_name TEXT,
      message TEXT NOT NULL,
      country TEXT,
      region TEXT,
      lat REAL,
      lon REAL,
      baseline_mbps REAL,
      metric_mbps REAL,
      noise_score REAL
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id TEXT PRIMARY KEY,
      sort_order INTEGER NOT NULL,
      ts TEXT NOT NULL,
      rule_id TEXT NOT NULL,
      rule_name TEXT NOT NULL,
      severity TEXT NOT NULL,
      source TEXT NOT NULL,
      status TEXT NOT NULL,
      ip TEXT,
      details TEXT NOT NULL,
      false_positive_likely INTEGER NOT NULL,
      classification TEXT,
      handled_by TEXT
    );

    CREATE TABLE IF NOT EXISTS incidents (
      id TEXT PRIMARY KEY,
      sort_order INTEGER NOT NULL,
      title TEXT NOT NULL,
      severity TEXT NOT NULL,
      status TEXT NOT NULL,
      fingerprint TEXT NOT NULL,
      ip TEXT,
      source TEXT,
      summary TEXT NOT NULL,
      notes TEXT NOT NULL,
      alert_ids_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS rules (
      id TEXT PRIMARY KEY,
      sort_order INTEGER NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      severity TEXT NOT NULL,
      tags_json TEXT NOT NULL,
      enabled INTEGER NOT NULL,
      triggers INTEGER NOT NULL,
      kind TEXT NOT NULL,
      threshold INTEGER NOT NULL,
      window_sec INTEGER NOT NULL,
      pattern TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS audit_entries (
      id TEXT PRIMARY KEY,
      sort_order INTEGER NOT NULL,
      ts TEXT NOT NULL,
      user_name TEXT NOT NULL,
      role TEXT NOT NULL,
      action TEXT NOT NULL,
      target TEXT NOT NULL,
      details TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);
    CREATE INDEX IF NOT EXISTS idx_logs_ts ON logs (ts DESC);
    CREATE INDEX IF NOT EXISTS idx_alerts_status ON alerts (status);
    CREATE INDEX IF NOT EXISTS idx_incidents_status ON incidents (status);
    CREATE INDEX IF NOT EXISTS idx_rules_enabled ON rules (enabled);
    PRAGMA user_version = 1;
  `);
}

function clearStateTables(db) {
  db.exec(`
    DELETE FROM app_meta;
    DELETE FROM settings;
    DELETE FROM system_state;
    DELETE FROM users;
    DELETE FROM sessions;
    DELETE FROM logs;
    DELETE FROM alerts;
    DELETE FROM incidents;
    DELETE FROM rules;
    DELETE FROM audit_entries;
  `);
}

function saveState(dbPath, statePath) {
  const state = normalizeState(readJson(statePath));
  const db = openDatabase(dbPath);

  try {
    ensureSchema(db);
    db.exec('BEGIN IMMEDIATE TRANSACTION');

    try {
      clearStateTables(db);

      const meta = ensureObject(state.meta, {});
      const target = ensureObject(meta.target, {});
      db.prepare(`
        INSERT INTO app_meta (
          id, name, version, mode, target_city, target_country, target_lat, target_lon
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        1,
        String(meta.name ?? 'ProjectM SOC'),
        String(meta.version ?? '6.0'),
        String(meta.mode ?? 'PowerShell + SQLite'),
        target.city ?? null,
        target.country ?? null,
        asNullableNumber(target.lat),
        asNullableNumber(target.lon)
      );

      const settings = ensureObject(state.settings, {});
      db.prepare(`
        INSERT INTO settings (
          id, simulation_interval_ms, license_capacity_eps, false_positive_tolerance, max_logs, sources_enabled_json
        ) VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        1,
        Number(settings.simulationIntervalMs ?? 4000),
        Number(settings.licenseCapacityEps ?? 5),
        Number(settings.falsePositiveTolerance ?? 15),
        Number(settings.maxLogs ?? 600),
        toJson(ensureObject(settings.sourcesEnabled, {}))
      );

      const system = ensureObject(state.system, {});
      db.prepare(`
        INSERT INTO system_state (
          id, next_ids_json, last_tick_utc, theme, cooldowns_json
        ) VALUES (?, ?, ?, ?, ?)
      `).run(
        1,
        toJson(ensureObject(system.nextIds, {})),
        String(system.lastTickUtc ?? new Date().toISOString()),
        String(system.theme ?? 'dark'),
        toJson(ensureObject(system.cooldowns, {}))
      );

      const insertUser = db.prepare(`
        INSERT INTO users (id, sort_order, username, role, display_name, password_json)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      state.users.forEach((user, index) => {
        insertUser.run(
          String(user.id),
          index,
          String(user.username),
          String(user.role),
          String(user.displayName ?? user.display_name ?? user.username),
          toJson(ensureObject(user.password, {}))
        );
      });

      const insertSession = db.prepare(`
        INSERT INTO sessions (token, sort_order, user_id, expires_at)
        VALUES (?, ?, ?, ?)
      `);
      state.sessions.forEach((session, index) => {
        insertSession.run(
          String(session.token),
          index,
          String(session.userId ?? session.user_id),
          String(session.expiresAt ?? session.expires_at)
        );
      });

      const insertLog = db.prepare(`
        INSERT INTO logs (
          id, sort_order, ts, source, type, severity, category, ip, user_name, message, country, region, lat, lon,
          baseline_mbps, metric_mbps, noise_score
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      state.logs.forEach((log, index) => {
        insertLog.run(
          String(log.id),
          index,
          String(log.ts),
          String(log.source),
          String(log.type),
          String(log.severity),
          String(log.category),
          log.ip ?? null,
          log.user ?? null,
          String(log.message),
          log.country ?? null,
          log.region ?? null,
          asNullableNumber(log.lat),
          asNullableNumber(log.lon),
          asNullableNumber(log.baselineMbps),
          asNullableNumber(log.metricMbps),
          asNullableNumber(log.noiseScore)
        );
      });

      const insertAlert = db.prepare(`
        INSERT INTO alerts (
          id, sort_order, ts, rule_id, rule_name, severity, source, status, ip, details, false_positive_likely,
          classification, handled_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      state.alerts.forEach((alert, index) => {
        insertAlert.run(
          String(alert.id),
          index,
          String(alert.ts),
          String(alert.ruleId ?? alert.rule_id),
          String(alert.ruleName ?? alert.rule_name),
          String(alert.severity),
          String(alert.source),
          String(alert.status),
          alert.ip ?? null,
          String(alert.details ?? ''),
          boolToInt(alert.falsePositiveLikely),
          alert.classification ?? null,
          alert.handledBy ?? alert.handled_by ?? null
        );
      });

      const insertIncident = db.prepare(`
        INSERT INTO incidents (
          id, sort_order, title, severity, status, fingerprint, ip, source, summary, notes, alert_ids_json,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      state.incidents.forEach((incident, index) => {
        insertIncident.run(
          String(incident.id),
          index,
          String(incident.title),
          String(incident.severity),
          String(incident.status),
          String(incident.fingerprint),
          incident.ip ?? null,
          incident.source ?? null,
          String(incident.summary ?? ''),
          String(incident.notes ?? ''),
          toJson(ensureArray(incident.alertIds ?? incident.alert_ids)),
          String(incident.createdAt ?? incident.created_at),
          String(incident.updatedAt ?? incident.updated_at)
        );
      });

      const insertRule = db.prepare(`
        INSERT INTO rules (
          id, sort_order, name, description, severity, tags_json, enabled, triggers, kind, threshold, window_sec, pattern
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      state.rules.forEach((rule, index) => {
        insertRule.run(
          String(rule.id),
          index,
          String(rule.name),
          String(rule.description ?? ''),
          String(rule.severity),
          toJson(ensureArray(rule.tags)),
          boolToInt(rule.enabled),
          Number(rule.triggers ?? 0),
          String(rule.kind),
          Number(rule.threshold ?? 1),
          Number(rule.windowSec ?? rule.window_sec ?? 60),
          String(rule.pattern ?? '')
        );
      });

      const insertAudit = db.prepare(`
        INSERT INTO audit_entries (id, sort_order, ts, user_name, role, action, target, details)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      state.audit.forEach((entry, index) => {
        insertAudit.run(
          String(entry.id),
          index,
          String(entry.ts),
          String(entry.user),
          String(entry.role),
          String(entry.action),
          String(entry.target),
          String(entry.details ?? '')
        );
      });

      db.exec('COMMIT');
    } catch (error) {
      try {
        db.exec('ROLLBACK');
      } catch (_) {
        // Ignore rollback failures and surface the original error.
      }
      throw error;
    }
  } finally {
    db.close();
  }
}

function loadState(dbPath) {
  if (!fs.existsSync(dbPath)) {
    fail(`SQLite database was not found: ${dbPath}`, 2);
  }

  const db = openDatabase(dbPath);

  try {
    ensureSchema(db);

    const meta = db.prepare(`
      SELECT name, version, mode, target_city, target_country, target_lat, target_lon
      FROM app_meta
      WHERE id = 1
    `).get();
    const settings = db.prepare(`
      SELECT simulation_interval_ms, license_capacity_eps, false_positive_tolerance, max_logs, sources_enabled_json
      FROM settings
      WHERE id = 1
    `).get();
    const system = db.prepare(`
      SELECT next_ids_json, last_tick_utc, theme, cooldowns_json
      FROM system_state
      WHERE id = 1
    `).get();

    if (!meta || !settings || !system) {
      fail('SQLite database exists but does not contain a complete ProjectM state.', 2);
    }

    const state = {
      meta: {
        name: meta.name,
        version: meta.version,
        mode: meta.mode,
        target: {
          city: meta.target_city,
          country: meta.target_country,
          lat: asNullableNumber(meta.target_lat),
          lon: asNullableNumber(meta.target_lon)
        }
      },
      users: db.prepare(`
        SELECT id, username, role, display_name, password_json
        FROM users
        ORDER BY sort_order ASC
      `).all().map((row) => ({
        id: row.id,
        username: row.username,
        role: row.role,
        displayName: row.display_name,
        password: parseJson(row.password_json, {})
      })),
      sessions: db.prepare(`
        SELECT token, user_id, expires_at
        FROM sessions
        ORDER BY sort_order ASC
      `).all().map((row) => ({
        token: row.token,
        userId: row.user_id,
        expiresAt: row.expires_at
      })),
      logs: db.prepare(`
        SELECT id, ts, source, type, severity, category, ip, user_name, message, country, region, lat, lon,
               baseline_mbps, metric_mbps, noise_score
        FROM logs
        ORDER BY sort_order ASC
      `).all().map((row) => ({
        id: row.id,
        ts: row.ts,
        source: row.source,
        type: row.type,
        severity: row.severity,
        category: row.category,
        ip: row.ip,
        user: row.user_name,
        message: row.message,
        country: row.country,
        region: row.region,
        lat: asNullableNumber(row.lat),
        lon: asNullableNumber(row.lon),
        baselineMbps: asNullableNumber(row.baseline_mbps),
        metricMbps: asNullableNumber(row.metric_mbps),
        noiseScore: asNullableNumber(row.noise_score)
      })),
      alerts: db.prepare(`
        SELECT id, ts, rule_id, rule_name, severity, source, status, ip, details, false_positive_likely, classification,
               handled_by
        FROM alerts
        ORDER BY sort_order ASC
      `).all().map((row) => ({
        id: row.id,
        ts: row.ts,
        ruleId: row.rule_id,
        ruleName: row.rule_name,
        severity: row.severity,
        source: row.source,
        status: row.status,
        ip: row.ip,
        details: row.details,
        falsePositiveLikely: asBoolean(row.false_positive_likely),
        classification: row.classification,
        handledBy: row.handled_by
      })),
      incidents: db.prepare(`
        SELECT id, title, severity, status, fingerprint, ip, source, summary, notes, alert_ids_json, created_at, updated_at
        FROM incidents
        ORDER BY sort_order ASC
      `).all().map((row) => ({
        id: row.id,
        title: row.title,
        severity: row.severity,
        status: row.status,
        fingerprint: row.fingerprint,
        ip: row.ip,
        source: row.source,
        summary: row.summary,
        notes: row.notes,
        alertIds: parseJson(row.alert_ids_json, []),
        createdAt: row.created_at,
        updatedAt: row.updated_at
      })),
      rules: db.prepare(`
        SELECT id, name, description, severity, tags_json, enabled, triggers, kind, threshold, window_sec, pattern
        FROM rules
        ORDER BY sort_order ASC
      `).all().map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        severity: row.severity,
        tags: parseJson(row.tags_json, []),
        enabled: asBoolean(row.enabled),
        triggers: Number(row.triggers ?? 0),
        kind: row.kind,
        threshold: Number(row.threshold ?? 1),
        windowSec: Number(row.window_sec ?? 60),
        pattern: row.pattern
      })),
      audit: db.prepare(`
        SELECT id, ts, user_name, role, action, target, details
        FROM audit_entries
        ORDER BY sort_order ASC
      `).all().map((row) => ({
        id: row.id,
        ts: row.ts,
        user: row.user_name,
        role: row.role,
        action: row.action,
        target: row.target,
        details: row.details
      })),
      settings: {
        simulationIntervalMs: Number(settings.simulation_interval_ms ?? 4000),
        licenseCapacityEps: Number(settings.license_capacity_eps ?? 5),
        falsePositiveTolerance: Number(settings.false_positive_tolerance ?? 15),
        maxLogs: Number(settings.max_logs ?? 600),
        sourcesEnabled: ensureObject(parseJson(settings.sources_enabled_json, {}), {})
      },
      system: {
        nextIds: ensureObject(parseJson(system.next_ids_json, {}), {}),
        lastTickUtc: system.last_tick_utc,
        theme: system.theme,
        cooldowns: ensureObject(parseJson(system.cooldowns_json, {}), {})
      }
    };

    process.stdout.write(JSON.stringify(state));
  } finally {
    db.close();
  }
}

const [, , command, dbPath, statePath] = process.argv;

if (!command || !dbPath) {
  usage();
}

if (command === 'save') {
  if (!statePath) {
    usage();
  }

  saveState(path.resolve(dbPath), path.resolve(statePath));
  process.exit(0);
}

if (command === 'load') {
  loadState(path.resolve(dbPath));
  process.exit(0);
}

usage();
