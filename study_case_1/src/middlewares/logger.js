/**
 * Logger Middleware
 *
 * Mencatat setiap percobaan akses ke endpoint yang dilindungi.
 * Log berisi: timestamp, method, path, IP, dan API key yang dikirim.
 */
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;
  const apiKey = req.headers["x-api-key"] || "(tidak ada)";

  console.log(
    `[${timestamp}] ${method} ${path} | IP: ${ip} | x-api-key: ${apiKey}`
  );

  next();
};

module.exports = { logger };
