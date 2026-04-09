/**
 * In-memory data utama aplikasi — data yang hanya bisa diakses saat tidak maintenance
 * (atau oleh IP yang di-whitelist).
 */
const APP_DATA = {
  appName: "MyApp v2.0",
  description: "Platform manajemen konten internal",
  features: [
    { id: 1, name: "Dashboard Analytics", status: "active" },
    { id: 2, name: "User Management", status: "active" },
    { id: 3, name: "Report Generator", status: "beta" },
  ],
  lastUpdated: "2026-04-10",
};

module.exports = { APP_DATA };
