/**
 * Logger Middleware
 *
 * Mencatat setiap request masuk.
 * Jika validasi gagal, logger akan mencetak field-field yang bermasalah.
 * Dipanggil SEBELUM validatePayload agar semua request — valid maupun tidak — tercatat.
 */
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`[${timestamp}] ${method} ${path} | IP: ${ip}`);
  console.log(`  → Body: ${JSON.stringify(req.body)}`);

  // Tandai waktu masuk agar bisa dihitung durasi response
  req._startTime = Date.now();

  // Hook ke event 'finish' untuk log hasil akhir + field yang gagal validasi
  res.on("finish", () => {
    const duration = Date.now() - req._startTime;
    const statusCode = res.statusCode;

    if (req.validationErrors && req.validationErrors.length > 0) {
      console.log(`  ✗ Validasi GAGAL (${statusCode}) | Durasi: ${duration}ms`);
      req.validationErrors.forEach((err) => {
        console.log(`    - [${err.field}] ${err.message}`);
      });
    } else {
      console.log(`  ✓ Response ${statusCode} | Durasi: ${duration}ms`);
    }
  });

  next();
};

module.exports = { logger };
