const success = (res, data, message = "OK", statusCode = 200) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

const error = (res, message = "Bad Request", statusCode = 400, errors = null) => {
  const body = { status: "error", message, data: null };
  if (errors) body.errors = errors;
  return res.status(statusCode).json(body);
};

module.exports = { success, error };
