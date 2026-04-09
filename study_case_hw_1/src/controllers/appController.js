const { APP_DATA } = require("../models/appData");
const maintenanceConfig = require("../config/maintenance");

const getApp = (req, res) => {
  const rawIP = req.ip || req.connection.remoteAddress || "unknown";
  const ip = rawIP.startsWith("::ffff:") ? rawIP.slice(7) : rawIP;
  const ts = new Date().toISOString();

  console.log(`[${ts}] GET /api/app | IP: ${ip}`);

  if (maintenanceConfig.isMaintenance) {
    const isWhitelisted =
      maintenanceConfig.WHITELISTED_IPS.includes(rawIP) ||
      maintenanceConfig.WHITELISTED_IPS.includes(ip);

    if (!isWhitelisted) {
      console.log(`[${ts}] [MAINTENANCE] ✗ Akses DITOLAK | IP: ${ip}`);
      return res.status(503).json({ status: "error", message: "Aplikasi sedang dalam perbaikan. Silakan coba beberapa saat lagi.", data: null });
    }

    console.log(`[${ts}] [MAINTENANCE] ✓ Akses DIIZINKAN | IP: ${ip} (whitelisted)`);
    return res.status(200).json({ status: "success", message: "Akses internal (maintenance aktif).", data: APP_DATA });
  }

  return res.status(200).json({ status: "success", message: "Data aplikasi berhasil dimuat.", data: APP_DATA });
};

module.exports = { getApp };
