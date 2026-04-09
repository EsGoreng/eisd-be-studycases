/**
 * Helper: Generate x-signature untuk testing manual.
 *
 * Jalankan: node study_case_2/generate-signature.js
 *
 * Signature = HMAC-SHA256(apiKey, secret) di-encode hex
 */
const crypto = require("crypto");

const KEYS = {
  "PARTNER-KEY-ALPHA-001": "super-secret-alpha",
  "PARTNER-KEY-BETA-002": "super-secret-beta",
  "PARTNER-KEY-GAMMA-003": "super-secret-gamma",
};

console.log("=== API Keys & Signatures untuk Testing ===\n");

for (const [apiKey, secret] of Object.entries(KEYS)) {
  const signature = crypto
    .createHmac("sha256", secret)
    .update(apiKey)
    .digest("hex");

  console.log(`Partner Key : ${apiKey}`);
  console.log(`Signature   : ${signature}`);
  console.log(`\ncURL:`);
  console.log(
    `curl -H "x-api-key: ${apiKey}" -H "x-signature: ${signature}" http://localhost:3002/api/secrets\n`
  );
  console.log("─".repeat(70) + "\n");
}
