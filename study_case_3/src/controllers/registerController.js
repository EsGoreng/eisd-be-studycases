const { REGISTER_RULES } = require("../config/validationRules");
const { save, findByEmail } = require("../models/userData");

const register = (req, res) => {
  const body = req.body || {};

  console.log(`[${new Date().toISOString()}] POST /api/register`);
  console.log(`  → Body: ${JSON.stringify(body)}`);

  const errors = [];
  for (const [field, rules] of Object.entries(REGISTER_RULES)) {
    const value = body[field];

    if (rules.required && (value === undefined || value === null || value === "")) {
      errors.push({ field, message: `Field '${field}' wajib diisi.` });
      continue;
    }
    if (value === undefined || value === null || value === "") continue;

    if (rules.type === "number" && (typeof value !== "number" || !Number.isFinite(value))) {
      errors.push({ field, message: `Field '${field}' harus bertipe number (bukan string).` });
    } else if (rules.type === "string" && typeof value !== "string") {
      errors.push({ field, message: `Field '${field}' harus bertipe string.` });
    }

    if (rules.mustContain && !String(value).includes(rules.mustContain)) {
      errors.push({ field, message: `Field '${field}' harus mengandung karakter '${rules.mustContain}'.` });
    }
    if (rules.minLength !== undefined && String(value).length < rules.minLength) {
      errors.push({ field, message: `Field '${field}' minimal ${rules.minLength} karakter.` });
    }
    if (rules.min !== undefined && value < rules.min) {
      errors.push({ field, message: `Field '${field}' minimal bernilai ${rules.min}.` });
    }
    if (rules.max !== undefined && value > rules.max) {
      errors.push({ field, message: `Field '${field}' maksimal bernilai ${rules.max}.` });
    }
  }

  if (errors.length > 0) {
    errors.forEach((e) => console.log(`  ✗ [${e.field}] ${e.message}`));
    return res.status(400).json({ status: "error", message: "Payload tidak valid.", data: null, errors });
  }

  if (findByEmail(body.email)) {
    return res.status(409).json({ status: "error", message: `Email '${body.email}' sudah terdaftar.`, data: null });
  }

  const user = save({ username: body.username, email: body.email, age: body.age });
  return res.status(201).json({ status: "success", message: "Registrasi berhasil.", data: user });
};

module.exports = { register };
