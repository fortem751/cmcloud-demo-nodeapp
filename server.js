const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const POCKETBASE_URL = (process.env.POCKETBASE_URL || "").replace(/\/$/, "");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", runtime: "node", timestamp: new Date().toISOString() });
});

// Frontend reads this to know where PocketBase lives — set POCKETBASE_URL env var
app.get("/api/config", (_req, res) => {
  res.json({ pocketbase_url: POCKETBASE_URL });
});

app.listen(PORT, () => {
  console.log(`CM Cloud demo app running on port ${PORT}`);
  if (POCKETBASE_URL) {
    console.log(`PocketBase backend: ${POCKETBASE_URL}`);
  } else {
    console.warn("POCKETBASE_URL not set — set it in environment variables");
  }
});
