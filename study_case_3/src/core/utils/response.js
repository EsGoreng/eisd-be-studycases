const success = (res, data, message = "OK", statusCode = 200) => {
  return res.status(statusCode).json({ status: "success", message, data });
};

const error = (res, message = "Error", statusCode = 400) => {
  return res.status(statusCode).json({ status: "error", message, data: null });
};

module.exports = { success, error };
