/**
 * Konfigurasi Maintenance Mode
 *
 * isMaintenance : toggle utama. Set ke false untuk menonaktifkan maintenance.
 * WHITELISTED_IPS: daftar IP tim internal yang tetap bisa akses saat maintenance.
 *
 * Catatan lokal: ::1 adalah IPv6 loopback (setara 127.0.0.1 di localhost).
 */
const config = {
  isMaintenance: true,

  WHITELISTED_IPS: [
    "127.0.0.1",   // localhost IPv4
    "::1",         // localhost IPv6
    "::ffff:127.0.0.1", // IPv4-mapped IPv6
    "192.168.1.10", // contoh IP tim internal
    "192.168.1.11",
  ],
};

module.exports = config;
