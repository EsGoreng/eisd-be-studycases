const { findById } = require("../events/event.model");
const { save, countByEvent, findByUserAndEvent, findAll } = require("./order.model");

const bookTicket = (req, res) => {
  const { userId, eventId } = req.body;
  const ts = new Date().toISOString();

  console.log(`[${ts}] POST /api/orders | Body: ${JSON.stringify(req.body)}`);

  if (!userId || !eventId) {
    return res.status(422).json({ status: "error", message: "Field 'userId' dan 'eventId' wajib diisi.", data: null });
  }

  const event = findById(eventId);
  if (!event) {
    return res.status(404).json({ status: "error", message: `Event '${eventId}' tidak ditemukan.`, data: null });
  }

  const now = new Date();

  if (now < event.startTime) {
    console.log(`[${ts}] ✗ User '${userId}' → event '${eventId}' belum dibuka`);
    return res.status(422).json({ status: "error", message: "Flash sale untuk event ini belum dibuka.", data: null });
  }

  if (now > event.endTime) {
    console.log(`[${ts}] ✗ User '${userId}' → event '${eventId}' sudah berakhir`);
    return res.status(422).json({ status: "error", message: "Jendela booking untuk event ini sudah ditutup.", data: null });
  }

  const filled = countByEvent(eventId);
  if (filled >= event.maxQuota) {
    console.log(`[${ts}] ✗ User '${userId}' mencoba booking saat kuota habis (${filled}/${event.maxQuota})`);
    return res.status(422).json({ status: "error", message: `Kuota tiket untuk '${event.name}' sudah habis (${filled}/${event.maxQuota}).`, data: null });
  }

  if (findByUserAndEvent(userId, eventId)) {
    console.log(`[${ts}] ✗ User '${userId}' mencoba booking duplikat`);
    return res.status(422).json({ status: "error", message: "Kamu sudah memiliki tiket untuk event ini (1 user = 1 tiket).", data: null });
  }

  const order = save({ userId, eventId });
  console.log(`[${ts}] ✓ Booking berhasil — Order '${order.id}' untuk User '${userId}'`);

  return res.status(201).json({
    status: "success",
    message: "Booking berhasil! Tiket kamu sudah dikonfirmasi.",
    data: { order, event: { id: event.id, name: event.name, venue: event.venue } },
  });
};

const listOrders = (req, res) => {
  return res.status(200).json({ status: "success", message: "Daftar semua order.", data: findAll() });
};

module.exports = { bookTicket, listOrders };
