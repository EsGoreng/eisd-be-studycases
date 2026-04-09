const crypto = require("crypto");
const { ALLOWED_KEYS } = require("../config/apiKeys");
const { error } = require("../utils/response");

/**
 * API Key & Signature Authenticator Middleware
 *
 * Flow:
 * 1. Baca header x-api-key dan x-signature dari request.
 * 2. Periksa apakah x-api-key ada di ALLOWED_KEYS.
 * 3. Hitung expected signature = HMAC-SHA256(apiKey, partnerSecret).
 * 4. Bandingkan expected vs signature yang dikirim (timing-safe compare).
 * 5. Lanjut ke next() jika valid, atau kirim 401 jika tidak.
 */
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  const signature = req.headers["x-signature"];

  // --- Step 1: Pastikan kedua header tersedia ---
  if (!apiKey || !signature) {
    return error(
      res,
      "Header x-api-key dan x-signature wajib disertakan.",
      401
    );
  }

  // --- Step 2: Periksa apakah API key dikenal ---
  const partner = ALLOWED_KEYS[apiKey];
  if (!partner) {
    return error(res, "API key tidak dikenali.", 401);
  }

  // --- Step 3: Hitung expected signature ---
  // Signature = HMAC-SHA256(apiKey, partnerSecret), di-encode base64
  const expectedSignature = crypto
    .createHmac("sha256", partner.secret)
    .update(apiKey)
    .digest("hex");

  // --- Step 4: Bandingkan signature (timing-safe) ---
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  const receivedBuffer = Buffer.from(signature, "utf8");

  const isValidLength = expectedBuffer.length === receivedBuffer.length;
  const isValidSignature =
    isValidLength &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

  if (!isValidSignature) {
    return error(res, "Signature tidak valid.", 401);
  }

  // --- Step 5: Autentikasi berhasil — simpan info partner ke req ---
  req.partner = { key: apiKey, name: partner.name };
  next();
};

module.exports = { apiKeyAuth };
