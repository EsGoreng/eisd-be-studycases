/**
 * Aturan validasi untuk endpoint POST /register.
 * Dipisah ke config agar mudah diubah tanpa menyentuh middleware.
 */
const REGISTER_RULES = {
  username: {
    required: true,
    type: "string",
    minLength: 3,
    maxLength: 30,
  },
  email: {
    required: true,
    type: "string",
    mustContain: "@",
  },
  age: {
    required: true,
    type: "number",
    min: 1,
    max: 120,
  },
};

module.exports = { REGISTER_RULES };
