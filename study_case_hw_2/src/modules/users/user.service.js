const { findById, findAll } = require("./user.model");

const getAll = () => findAll();

const getById = (id) => {
  const user = findById(id);
  if (!user) {
    const err = new Error(`User '${id}' tidak ditemukan.`);
    err.statusCode = 404;
    throw err;
  }
  return user;
};

module.exports = { getAll, getById };
