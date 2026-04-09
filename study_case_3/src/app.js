const http       = require("http");
const express    = require("express");
const eventRoute = require("./modules/events/event.route");
const orderRoute = require("./modules/orders/order.route");

const app = express();

// ── Global Middleware ──────────────────────────────────────────────
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────
app.use("/api/events", eventRoute);
app.use("/api/orders", orderRoute);

// ── 404 Handler ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Endpoint tidak ditemukan.", data: null });
});

// ── Start Server ──────────────────────────────────────────────────
const PORT = process.env.PORT || 3005;
const server = http.createServer(app);

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`[ERROR] Port ${PORT} sudah digunakan oleh proses lain.`);
    console.error(`  Jalankan: netstat -ano | findstr :${PORT}  lalu kill PID-nya.`);
  } else {
    console.error("[ERROR] Server gagal start:", err.message);
  }
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`[study_case_5] Server berjalan di http://localhost:${PORT}`);
  console.log("Endpoint yang tersedia:");
  console.log("  GET  /api/events");
  console.log("  GET  /api/events/:id");
  console.log("  POST /api/orders     { userId, eventId }");
  console.log("  GET  /api/orders");
});
