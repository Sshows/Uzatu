const path = require("path");
const { processSubmission } = require("../lib/rsvp");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, message: "Method not allowed" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const submission = await processSubmission(body, {
      env: process.env,
      storagePath: process.env.VERCEL ? null : path.join(process.cwd(), "data", "rsvp-submissions.json")
    });

    res.status(200).json({
      ok: true,
      message: "RSVP accepted",
      result: submission.result
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      ok: false,
      message: error.message || "Internal server error",
      errors: error.errors || null
    });
  }
};
