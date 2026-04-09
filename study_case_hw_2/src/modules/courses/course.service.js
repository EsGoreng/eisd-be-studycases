const { findById, findAll } = require("./course.model");

const getAll = () => findAll();

const getById = (id) => {
  const course = findById(id);
  if (!course) {
    const err = new Error(`Course '${id}' tidak ditemukan.`);
    err.statusCode = 404;
    throw err;
  }
  return course;
};

module.exports = { getAll, getById };
