const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// --- Environment variables (set these in your App Deploy dashboard) ---
const POCKETBASE_URL = (process.env.POCKETBASE_URL || "").replace(/\/$/, "");
const APP_TITLE     = process.env.APP_TITLE    || "Team Ideas Board";
const APP_ACCENT    = process.env.APP_ACCENT   || "#6366f1";   // hex colour — try #3b82f6 or #10b981

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", runtime: "node", timestamp: new Date().toISOString() });
});

// Config endpoint — frontend fetches this on load to get PocketBase URL + branding
app.get("/api/config", (_req, res) => {
  res.json({
    pocketbase_url: POCKETBASE_URL,
    app_title:      APP_TITLE,
    app_accent:     APP_ACCENT,
  });
});

app.listen(PORT, () => {
  console.log(`[CM Cloud] "${APP_TITLE}" running on port ${PORT}`);
  console.log(`[CM Cloud] PocketBase backend: ${POCKETBASE_URL || "(not set — add POCKETBASE_URL env var)"}`);
  console.log(`[CM Cloud] Accent colour: ${APP_ACCENT}`);
});
