/**
 * In-memory event storage.
 *
 * Tiga skenario waktu untuk kemudahan testing:
 *   EVT-001 : sedang aktif  (jendela booking mencakup hari ini)
 *   EVT-002 : belum dimulai (startTime di masa depan)
 *   EVT-003 : sudah berakhir (endTime di masa lalu)
 */
const events = [
  {
    id: "EVT-001",
    name: "Konser Malam Nusantara",
    venue: "Jakarta Convention Center",
    startTime: new Date("2026-04-09T00:00:00.000Z"), // kemarin → sudah mulai
    endTime:   new Date("2026-04-11T23:59:59.000Z"), // besok   → belum selesai
    maxQuota: 3,                                      // kecil agar mudah diuji
  },
  {
    id: "EVT-002",
    name: "Festival Elektronik Bali",
    venue: "Garuda Wisnu Kencana",
    startTime: new Date("2026-04-20T08:00:00.000Z"), // belum dimulai
    endTime:   new Date("2026-04-20T20:00:00.000Z"),
    maxQuota: 500,
  },
  {
    id: "EVT-003",
    name: "Jazz di Taman",
    venue: "Taman Ismail Marzuki",
    startTime: new Date("2026-04-01T09:00:00.000Z"), // sudah lewat
    endTime:   new Date("2026-04-05T21:00:00.000Z"),
    maxQuota: 200,
  },
];

const findById = (id) => events.find((e) => e.id === id) || null;
const findAll  = ()   => events;

module.exports = { findById, findAll };
