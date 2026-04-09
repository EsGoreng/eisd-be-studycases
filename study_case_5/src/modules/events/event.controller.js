const { getAll, getById } = require("./event.service");
const { success, error } = require("../../core/utils/response");

const listEvents = (req, res) => {
  return success(res, getAll(), "Daftar event tersedia.");
};

const getEvent = (req, res) => {
  try {
    return success(res, getById(req.params.id), "Detail event.");
  } catch (err) {
    return error(res, err.message, err.statusCode || 500);
  }
};

module.exports = { listEvents, getEvent };
