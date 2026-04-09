/**
 * In-memory "database" — hardcoded secret data
 * that only authorized partners may access.
 */
const SECRET_DATA = [
  {
    id: 1,
    code: "CLASSIFIED-ALPHA",
    description: "Koordinat Markas Besar A",
    clearanceLevel: "TOP SECRET",
  },
  {
    id: 2,
    code: "CLASSIFIED-BETA",
    description: "Daftar Agen Lapangan B",
    clearanceLevel: "SECRET",
  },
  {
    id: 3,
    code: "CLASSIFIED-GAMMA",
    description: "Protokol Enkripsi Saluran C",
    clearanceLevel: "CONFIDENTIAL",
  },
];

module.exports = { SECRET_DATA };
