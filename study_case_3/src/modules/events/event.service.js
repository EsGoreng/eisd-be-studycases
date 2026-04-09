const { findById, findAll } = require("./event.model");

const getAll = () => findAll();

const getById = (id) => {
  const event = findById(id);
  if (!event) {
    const err = new Error(`Event '${id}' tidak ditemukan.`);
    err.statusCode = 404;
    throw err;
  }
  return event;
};

module.exports = { getAll, getById };
