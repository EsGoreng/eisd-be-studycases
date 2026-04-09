const logger = (req, res, next) => {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${req.method} ${req.originalUrl} | IP: ${req.ip}`);
  next();
};

module.exports = { logger };
