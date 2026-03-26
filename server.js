const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const { processSubmission } = require("./lib/rsvp");

const rootDir = process.cwd();
const storagePath = path.join(rootDir, "data", "rsvp-submissions.json");
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(payload));
}

async function readRequestBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const body = Buffer.concat(chunks).toString("utf8");
  return body ? JSON.parse(body) : {};
}

function getStaticPath(urlPath) {
  if (urlPath === "/" || urlPath === "") {
    return path.join(rootDir, "index.html");
  }

  const safePath = path.normalize(urlPath).replace(/^(\.\.[\\/])+/, "");
  return path.join(rootDir, safePath);
}

async function serveStatic(res, filePath) {
  try {
    const content = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType
    });
    res.end(content);
  } catch (error) {
    sendJson(res, 404, { ok: false, message: "Not found" });
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "GET" && url.pathname === "/api/health") {
      sendJson(res, 200, { ok: true, service: "qyz-uzatu-invite" });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/rsvp") {
      const body = await readRequestBody(req);
      const submission = await processSubmission(body, {
        env: process.env,
        storagePath
      });

      sendJson(res, 200, {
        ok: true,
        message: "RSVP accepted",
        result: submission.result
      });
      return;
    }

    if (req.method === "GET") {
      await serveStatic(res, getStaticPath(url.pathname));
      return;
    }

    sendJson(res, 405, { ok: false, message: "Method not allowed" });
  } catch (error) {
    if (error.statusCode) {
      sendJson(res, error.statusCode, {
        ok: false,
        message: error.message,
        errors: error.errors || null
      });
      return;
    }

    sendJson(res, 500, {
      ok: false,
      message: "Internal server error"
    });
  }
});

server.listen(port, () => {
  console.log(`Invitation site running on http://127.0.0.1:${port}`);
});
