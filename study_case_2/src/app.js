const http    = require("http");
const express = require("express");
const secretRoutes = require("./routes/secretRoutes");

const app = express();

// ── Global Middleware ──────────────────────────────────────────────
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────
app.use("/api/secrets", secretRoutes);

// ── 404 Handler ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Endpoint tidak ditemukan.", data: null });
});

// ── Start Server ──────────────────────────────────────────────────
const PORT = process.env.PORT || 3002;
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
  console.log(`[study_case_2] Server berjalan di http://localhost:${PORT}`);
  console.log("Endpoint yang tersedia:");
  console.log("  GET /api/secrets");
  console.log("  GET /api/secrets/:id");
});
