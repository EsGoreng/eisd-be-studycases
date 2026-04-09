const { save, findAll } = require("./order.model");

const createOrder = ({ userId, eventId }) => save({ userId, eventId });

const getAllOrders = () => findAll();

module.exports = { createOrder, getAllOrders };
