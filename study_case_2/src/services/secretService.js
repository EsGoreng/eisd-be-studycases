const { SECRET_DATA } = require("../models/secretData");

/**
 * Mengembalikan seluruh daftar data rahasia.
 */
const getAllSecrets = () => {
  return SECRET_DATA;
};

/**
 * Mengembalikan satu data rahasia berdasarkan id.
 * Throws jika tidak ditemukan.
 */
const getSecretById = (id) => {
  const item = SECRET_DATA.find((d) => d.id === parseInt(id, 10));
  if (!item) {
    const err = new Error(`Data dengan id ${id} tidak ditemukan.`);
    err.statusCode = 404;
    throw err;
  }
  return item;
};

module.exports = { getAllSecrets, getSecretById };
