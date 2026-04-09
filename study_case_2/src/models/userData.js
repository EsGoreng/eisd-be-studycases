/**
 * In-memory user storage — mensimulasikan "database" tanpa library eksternal.
 */
const users = [];
let nextId = 1;

const save = (userData) => {
  const user = { id: nextId++, ...userData, createdAt: new Date().toISOString() };
  users.push(user);
  return user;
};

const findAll = () => users;

const findByEmail = (email) => users.find((u) => u.email === email);

module.exports = { save, findAll, findByEmail };
