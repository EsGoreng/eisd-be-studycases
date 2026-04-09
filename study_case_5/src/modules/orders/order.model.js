/**
 * In-memory order storage.
 */
const orders = [];
let nextId = 1;

/** Simpan order baru, kembalikan objek yang tersimpan. */
const save = ({ userId, eventId }) => {
  const order = {
    id: `ORD-${String(nextId++).padStart(4, "0")}`,
    userId,
    eventId,
    bookedAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
};

/** Hitung berapa order yang ada untuk satu event. */
const countByEvent = (eventId) =>
  orders.filter((o) => o.eventId === eventId).length;

/** Cari order milik userId untuk eventId tertentu. */
const findByUserAndEvent = (userId, eventId) =>
  orders.find((o) => o.userId === userId && o.eventId === eventId) || null;

const findAll = () => orders;

module.exports = { save, countByEvent, findByUserAndEvent, findAll };
