const maintenanceConfig = require("../config/maintenance");
const { error } = require("../utils/response");

/**
 * Normalisasi IP — mengubah format IPv4-mapped IPv6 (::ffff:x.x.x.x)
 * menjadi IPv4 biasa agar mudah dicocokkan dengan WHITELISTED_IPS.
 */
const normalizeIP = (ip = "") => {
  return ip.startsWith("::ffff:") ? ip.slice(7) : ip;
};

/**
 * Maintenance Mode & IP Whitelisting Middleware
 *
 * Flow:
 * 1. Baca isMaintenance dari config.
 * 2. Jika false → langsung next(), tidak ada pemeriksaan lebih lanjut.
 * 3. Jika true  → log percobaan akses (siapa, dari mana, kapan).
 * 4.             → Cek apakah IP ada di WHITELISTED_IPS.
 * 5.             → Jika tidak ada → 503 Service Unavailable.
 * 6.             → Jika ada      → log "akses diizinkan" → next().
 */
const maintenanceCheck = (req, res, next) => {
  const { isMaintenance, WHITELISTED_IPS } = maintenanceConfig;

  // Tidak sedang maintenance — lewati semua pengecekan
  if (!isMaintenance) {
    return next();
  }

  const rawIP = req.ip || req.connection.remoteAddress || "unknown";
  const ip = normalizeIP(rawIP);
  const timestamp = new Date().toISOString();
  const isWhitelisted = WHITELISTED_IPS.includes(rawIP) || WHITELISTED_IPS.includes(ip);

  // --- Logger: catat SETIAP percobaan akses saat maintenance ---
  if (isWhitelisted) {
    console.log(
      `[${timestamp}] [MAINTENANCE] ✓ Akses DIIZINKAN | IP: ${ip} (whitelisted) | ${req.method} ${req.originalUrl}`
    );
    // Tandai agar controller tahu ini akses internal
    req.isInternalAccess = true;
    return next();
  }

  console.log(
    `[${timestamp}] [MAINTENANCE] ✗ Akses DITOLAK   | IP: ${ip} (bukan whitelist) | ${req.method} ${req.originalUrl}`
  );

  return error(
    res,
    "Aplikasi sedang dalam perbaikan. Silakan coba beberapa saat lagi.",
    503
  );
};

module.exports = { maintenanceCheck };
