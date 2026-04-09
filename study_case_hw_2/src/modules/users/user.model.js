const users = [
  { id: "USR-001", name: "Alice",   email: "alice@mail.com" },
  { id: "USR-002", name: "Bob",     email: "bob@mail.com" },
  { id: "USR-003", name: "Charlie", email: "charlie@mail.com" },
];

const findById = (id) => users.find((u) => u.id === id) || null;
const findAll  = ()   => users;

module.exports = { findById, findAll };
