const { REGISTER_RULES } = require("../config/validationRules");
const { error } = require("../utils/response");

/**
 * Menjalankan satu aturan validasi terhadap satu nilai.
 * Mengembalikan string pesan error, atau null jika lolos.
 */
const applyRule = (field, value, rules) => {
  // --- required ---
  if (rules.required && (value === undefined || value === null || value === "")) {
    return `Field '${field}' wajib diisi.`;
  }

  // Jika tidak required dan tidak ada nilainya, lewati pengecekan lainnya
  if (value === undefined || value === null || value === "") return null;

  // --- type ---
  if (rules.type) {
    const actualType = typeof value;

    // Khusus: string "123" tidak boleh lolos sebagai number
    if (rules.type === "number" && (actualType !== "number" || !Number.isFinite(value))) {
      return `Field '${field}' harus bertipe number (bukan string).`;
    }

    if (rules.type === "string" && actualType !== "string") {
      return `Field '${field}' harus bertipe string.`;
    }
  }

  // --- mustContain ---
  if (rules.mustContain && !String(value).includes(rules.mustContain)) {
    return `Field '${field}' harus mengandung karakter '${rules.mustContain}'.`;
  }

  // --- minLength / maxLength ---
  if (rules.minLength !== undefined && String(value).length < rules.minLength) {
    return `Field '${field}' minimal ${rules.minLength} karakter.`;
  }

  if (rules.maxLength !== undefined && String(value).length > rules.maxLength) {
    return `Field '${field}' maksimal ${rules.maxLength} karakter.`;
  }

  // --- min / max (untuk number) ---
  if (rules.min !== undefined && value < rules.min) {
    return `Field '${field}' minimal bernilai ${rules.min}.`;
  }

  if (rules.max !== undefined && value > rules.max) {
    return `Field '${field}' maksimal bernilai ${rules.max}.`;
  }

  return null;
};

/**
 * Payload Schema Validator Middleware
 *
 * Flow:
 * 1. Iterasi setiap field dalam REGISTER_RULES.
 * 2. Jalankan semua aturan validasi per field.
 * 3. Kumpulkan semua error (tidak berhenti di error pertama).
 * 4. Jika ada error → simpan ke req.validationErrors lalu kembalikan 400.
 * 5. Jika bersih → lampirkan req.validatedBody dan lanjut ke next().
 */
const validatePayload = (req, res, next) => {
  const body = req.body || {};
  const validationErrors = [];

  for (const [field, rules] of Object.entries(REGISTER_RULES)) {
    const message = applyRule(field, body[field], rules);
    if (message) {
      validationErrors.push({ field, message });
    }
  }

  if (validationErrors.length > 0) {
    // Simpan ke req agar logger bisa membacanya via event 'finish'
    req.validationErrors = validationErrors;
    return error(res, "Payload tidak valid.", 400, validationErrors);
  }

  // Data bersih — saring hanya field yang dikenal sesuai rules
  req.validatedBody = Object.fromEntries(
    Object.keys(REGISTER_RULES).map((field) => [field, body[field]])
  );

  next();
};

module.exports = { validatePayload };
