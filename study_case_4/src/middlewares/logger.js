/**
 * Logger Middleware
 *
 * Mencatat setiap request masuk secara umum.
 * Saat maintenance aktif, middleware maintenanceCheck akan menambah
 * log khusus bertanda [MAINTENANCE] untuk setiap percobaan akses.
 */
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`[${timestamp}] ${req.method} ${req.originalUrl} | IP: ${ip}`);

  next();
};

module.exports = { logger };
