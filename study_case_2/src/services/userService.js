const { save, findByEmail } = require("../models/userData");

const registerUser = (userData) => {
  // Cek duplikat email di in-memory storage
  if (findByEmail(userData.email)) {
    const err = new Error(`Email '${userData.email}' sudah terdaftar.`);
    err.statusCode = 409;
    throw err;
  }

  return save(userData);
};

module.exports = { registerUser };
