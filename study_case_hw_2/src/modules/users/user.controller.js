const { getAll, getById } = require("./user.service");
const { success, error } = require("../../core/utils/response");

const listUsers = (req, res) => success(res, getAll(), "Daftar user.");

const getUser = (req, res) => {
  try {
    return success(res, getById(req.params.id), "Detail user.");
  } catch (err) {
    return error(res, err.message, err.statusCode || 500);
  }
};

module.exports = { listUsers, getUser };
