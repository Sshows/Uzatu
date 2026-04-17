const http = require("http");
const fs = require("fs");
const path = require("path");

const root = "C:/Users/User/Documents/Playground/uzatu-upload-clean";
const port = 4174;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".zip": "application/zip",
};

http
  .createServer((req, res) => {
    let reqPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (reqPath === "/" || reqPath === "") reqPath = "/mereke-qyz-uzatu-updated.html";
    const filePath = path.join(root, reqPath.replace(/^\/+/, ""));
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end("not found");
        return;
      }
      res.setHeader("Content-Type", types[path.extname(filePath).toLowerCase()] || "application/octet-stream");
      res.end(data);
    });
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`gallery-preview listening on http://127.0.0.1:${port}`);
  });
