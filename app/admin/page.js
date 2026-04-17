import { cookies } from "next/headers";
import { siteContent } from "@/lib/site-content";
import { getStorageMode, listSubmissions, summarizeSubmissions } from "@/lib/rsvp-storage";
import {
  ADMIN_COOKIE_NAME,
  isAdminConfigured,
  verifyAdminSessionValue
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function formatAttendance(attendance) {
  if (attendance === "yes") {
    return siteContent.admin.yesLabel;
  }

  if (attendance === "no") {
    return siteContent.admin.noLabel;
  }

  return siteContent.admin.maybeLabel;
}

function formatSubmittedAt(value) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("kk-KZ", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function AdminLogin({ error }) {
  return (
    <main className="admin-page">
      <div className="container">
        <section className="admin-login" data-reveal>
          <p className="admin-meta">{siteContent.admin.title}</p>
          <h1>{siteContent.admin.loginTitle}</h1>
          <p>{siteContent.admin.loginLead}</p>

          {error ? <p className="admin-error">{error}</p> : null}

          <form action="/api/admin/login" method="post">
            <div className="form-field">
              <label htmlFor="username">{siteContent.admin.usernameLabel}</label>
              <input id="username" name="username" type="text" autoComplete="username" required />
            </div>

            <div className="form-field">
              <label htmlFor="password">{siteContent.admin.passwordLabel}</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>

            <button className="button button--primary button--submit" type="submit">
              {siteContent.admin.loginButton}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default async function AdminPage({ searchParams }) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = verifyAdminSessionValue(sessionValue);

  if (!isAdminConfigured()) {
    return <AdminLogin error={siteContent.admin.configMissing} />;
  }

  if (!isAuthenticated) {
    const errorMessage =
      params?.error === "invalid"
        ? siteContent.admin.invalidCredentials
        : params?.error === "config"
          ? siteContent.admin.configMissing
          : "";

    return <AdminLogin error={errorMessage} />;
  }

  let submissions = [];
  let summary = summarizeSubmissions([]);
  let storageError = "";

  try {
    submissions = await listSubmissions();
    summary = summarizeSubmissions(submissions);
  } catch (error) {
    storageError = error.message || siteContent.admin.storageError;
  }

  return (
    <main className="admin-page">
      <div className="container">
        <section className="admin-shell" data-reveal>
          <div className="admin-shell__top">
            <div>
              <p className="admin-meta">{siteContent.admin.title}</p>
              <h1 className="admin-title">{siteContent.admin.title}</h1>
              <p className="admin-description">{siteContent.admin.lead}</p>
              <p className="admin-description">
                {siteContent.admin.storageModeLabel}: {getStorageMode()}
              </p>
            </div>

            <div className="admin-actions">
              <a className="button button--secondary" href="/api/admin/rsvps/export">
                {siteContent.admin.exportLabel}
              </a>

              <form action="/api/admin/logout" method="post">
                <button className="button button--primary" type="submit">
                  {siteContent.admin.logoutLabel}
                </button>
              </form>
            </div>
          </div>

          {storageError ? <p className="admin-error">{storageError}</p> : null}
        </section>

        <section className="admin-summary" data-reveal>
          <p className="admin-label">{siteContent.admin.summaryTitle}</p>
          <div className="admin-summary__grid">
            <article className="admin-summary__card">
              <span>{siteContent.admin.totalResponsesLabel}</span>
              <strong>{summary.totalResponses}</strong>
            </article>
            <article className="admin-summary__card">
              <span>{siteContent.admin.totalGuestsLabel}</span>
              <strong>{summary.totalGuests}</strong>
            </article>
            <article className="admin-summary__card">
              <span>{siteContent.admin.yesLabel}</span>
              <strong>{summary.yes}</strong>
            </article>
            <article className="admin-summary__card">
              <span>{siteContent.admin.maybeLabel}</span>
              <strong>{summary.maybe}</strong>
            </article>
            <article className="admin-summary__card">
              <span>{siteContent.admin.noLabel}</span>
              <strong>{summary.no}</strong>
            </article>
          </div>
        </section>

        <section className="admin-table-shell" data-reveal>
          <p className="admin-label">{siteContent.admin.tableTitle}</p>

          {submissions.length === 0 ? (
            <p className="admin-empty">{siteContent.admin.emptyState}</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>{siteContent.admin.headers.submittedAt}</th>
                    <th>{siteContent.admin.headers.fullName}</th>
                    <th>{siteContent.admin.headers.contact}</th>
                    <th>{siteContent.admin.headers.attendance}</th>
                    <th>{siteContent.admin.headers.guestCount}</th>
                    <th>{siteContent.admin.headers.dietaryNotes}</th>
                    <th>{siteContent.admin.headers.comment}</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission.id || `${submission.full_name}-${submission.submitted_at}`}>
                      <td>{formatSubmittedAt(submission.submitted_at)}</td>
                      <td>{submission.full_name || "-"}</td>
                      <td>{submission.contact || "-"}</td>
                      <td>
                        <span className="admin-badge">{formatAttendance(submission.attendance)}</span>
                      </td>
                      <td>{submission.guest_count ?? "-"}</td>
                      <td>{submission.dietary_notes || "-"}</td>
                      <td>{submission.comment || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
