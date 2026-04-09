const http             = require("http");
const express          = require("express");
const courseRoute      = require("./modules/courses/course.route");
const userRoute        = require("./modules/users/user.route");
const enrollmentRoute  = require("./modules/enrollments/enrollment.route");

const app = express();

app.use(express.json());

app.use("/api/courses",     courseRoute);
app.use("/api/users",       userRoute);
app.use("/api/enrollments", enrollmentRoute);

app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Endpoint tidak ditemukan.", data: null });
});

const PORT = process.env.PORT || 3006;
const server = http.createServer(app);

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`[ERROR] Port ${PORT} sudah digunakan. Jalankan: netstat -ano | findstr :${PORT}`);
  } else {
    console.error("[ERROR]", err.message);
  }
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`[study_case_6] Server berjalan di http://localhost:${PORT}`);
  console.log("Endpoint yang tersedia:");
  console.log("  GET  /api/courses");
  console.log("  GET  /api/users");
  console.log("  POST /api/enrollments   { userId, courseId }");
  console.log("  GET  /api/enrollments?userId=USR-001");
});
