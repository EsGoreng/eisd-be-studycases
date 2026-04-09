/**
 * ALLOWED_KEYS — in-memory registry of valid API keys.
 *
 * Each entry contains:
 *   key    : the public API key sent via x-api-key header
 *   secret : used server-side to verify the HMAC-SHA256 signature
 *   name   : human-readable partner name (for logging)
 */
const ALLOWED_KEYS = {
  "PARTNER-KEY-ALPHA-001": {
    secret: "super-secret-alpha",
    name: "Partner Alpha",
  },
  "PARTNER-KEY-BETA-002": {
    secret: "super-secret-beta",
    name: "Partner Beta",
  },
  "PARTNER-KEY-GAMMA-003": {
    secret: "super-secret-gamma",
    name: "Partner Gamma",
  },
};

module.exports = { ALLOWED_KEYS };
