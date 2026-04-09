const { findById }          = require("../events/event.model");
const { countByEvent, findByUserAndEvent } = require("./order.model");
const { error }             = require("../../core/utils/response");

/**
 * ─────────────────────────────────────────────
 *  THE GATEKEEPER — Order Booking Validator
 * ─────────────────────────────────────────────
 *
 * Tiga pemeriksaan berjalan berurutan sebelum request
 * sampai ke controller. Jika salah satu gagal, middleware
 * langsung mengembalikan 422 dan mencatat alasan penolakan.
 *
 * 1. Time Check   — apakah sekarang ada di dalam jendela booking?
 * 2. Quota Check  — apakah kuota event belum habis?
 * 3. Single Order — apakah user belum pernah booking event ini?
 */
const validateBooking = (req, res, next) => {
  const { userId, eventId } = req.body;
  const ts = new Date().toISOString();

  // ── Prasyarat: field wajib ada ────────────────────────────────
  if (!userId || !eventId) {
    return error(res, "Field 'userId' dan 'eventId' wajib diisi.", 422);
  }

  // ── Cari event ────────────────────────────────────────────────
  const event = findById(eventId);
  if (!event) {
    return error(res, `Event '${eventId}' tidak ditemukan.`, 404);
  }

  const now = new Date();

  // ── 1. TIME CHECK ─────────────────────────────────────────────
  if (now < event.startTime) {
    console.log(
      `[${ts}] [BOOKING] ✗ User '${userId}' → event '${eventId}' belum dibuka ` +
      `(buka: ${event.startTime.toISOString()})`
    );
    return error(res, "Flash sale untuk event ini belum dibuka.", 422);
  }

  if (now > event.endTime) {
    console.log(
      `[${ts}] [BOOKING] ✗ User '${userId}' → event '${eventId}' sudah berakhir ` +
      `(tutup: ${event.endTime.toISOString()})`
    );
    return error(res, "Jendela booking untuk event ini sudah ditutup.", 422);
  }

  // ── 2. QUOTA CHECK ────────────────────────────────────────────
  const filled = countByEvent(eventId);
  if (filled >= event.maxQuota) {
    console.log(
      `[${ts}] [BOOKING] ✗ User '${userId}' mencoba booking saat kuota habis ` +
      `(${filled}/${event.maxQuota}) → event '${eventId}'`
    );
    return error(res, `Kuota tiket untuk '${event.name}' sudah habis (${filled}/${event.maxQuota}).`, 422);
  }

  // ── 3. SINGLE ORDER CHECK ─────────────────────────────────────
  const duplicate = findByUserAndEvent(userId, eventId);
  if (duplicate) {
    console.log(
      `[${ts}] [BOOKING] ✗ User '${userId}' mencoba booking duplikat → ` +
      `sudah memiliki order '${duplicate.id}' untuk event '${eventId}'`
    );
    return error(res, "Kamu sudah memiliki tiket untuk event ini (1 user = 1 tiket).", 422);
  }

  // ── SEMUA CEK LOLOS ───────────────────────────────────────────
  console.log(
    `[${ts}] [BOOKING] ✓ User '${userId}' lolos validasi → event '${eventId}' ` +
    `(sisa kuota: ${event.maxQuota - filled - 1})`
  );

  // Lampirkan event ke req agar controller tidak perlu query ulang
  req.event = event;
  next();
};

module.exports = { validateBooking };
