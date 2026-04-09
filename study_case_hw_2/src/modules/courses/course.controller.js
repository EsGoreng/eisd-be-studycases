const { getAll, getById } = require("./course.service");
const { success, error } = require("../../core/utils/response");

const listCourses = (req, res) => success(res, getAll(), "Daftar course tersedia.");

const getCourse = (req, res) => {
  try {
    return success(res, getById(req.params.id), "Detail course.");
  } catch (err) {
    return error(res, err.message, err.statusCode || 500);
  }
};

module.exports = { listCourses, getCourse };
