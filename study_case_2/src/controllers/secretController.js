const crypto = require("crypto");
const { ALLOWED_KEYS } = require("../config/apiKeys");
const { SECRET_DATA } = require("../models/secretData");

const getAll = (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  const apiKey = req.headers["x-api-key"];
  const signature = req.headers["x-signature"];

  console.log(`[${new Date().toISOString()}] GET /api/secrets | IP: ${ip} | x-api-key: ${apiKey || "(tidak ada)"}`);

  if (!apiKey || !signature) {
    return res.status(401).json({ status: "error", message: "Header x-api-key dan x-signature wajib disertakan.", data: null });
  }

  const partner = ALLOWED_KEYS[apiKey];
  if (!partner) {
    return res.status(401).json({ status: "error", message: "API key tidak dikenali.", data: null });
  }

  const expected = crypto.createHmac("sha256", partner.secret).update(apiKey).digest("hex");
  const expectedBuf = Buffer.from(expected);
  const receivedBuf = Buffer.from(signature);

  if (expectedBuf.length !== receivedBuf.length || !crypto.timingSafeEqual(expectedBuf, receivedBuf)) {
    return res.status(401).json({ status: "error", message: "Signature tidak valid.", data: null });
  }

  return res.status(200).json({ status: "success", message: `Selamat datang, ${partner.name}.`, data: SECRET_DATA });
};

const getById = (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  const apiKey = req.headers["x-api-key"];
  const signature = req.headers["x-signature"];

  console.log(`[${new Date().toISOString()}] GET /api/secrets/${req.params.id} | IP: ${ip} | x-api-key: ${apiKey || "(tidak ada)"}`);

  if (!apiKey || !signature) {
    return res.status(401).json({ status: "error", message: "Header x-api-key dan x-signature wajib disertakan.", data: null });
  }

  const partner = ALLOWED_KEYS[apiKey];
  if (!partner) {
    return res.status(401).json({ status: "error", message: "API key tidak dikenali.", data: null });
  }

  const expected = crypto.createHmac("sha256", partner.secret).update(apiKey).digest("hex");
  const expectedBuf = Buffer.from(expected);
  const receivedBuf = Buffer.from(signature);

  if (expectedBuf.length !== receivedBuf.length || !crypto.timingSafeEqual(expectedBuf, receivedBuf)) {
    return res.status(401).json({ status: "error", message: "Signature tidak valid.", data: null });
  }

  const item = SECRET_DATA.find((d) => d.id === parseInt(req.params.id, 10));
  if (!item) {
    return res.status(404).json({ status: "error", message: `Data dengan id ${req.params.id} tidak ditemukan.`, data: null });
  }

  return res.status(200).json({ status: "success", message: `Data dengan id ${req.params.id} ditemukan.`, data: item });
};

module.exports = { getAll, getById };
