const { save, findAll, findByUser } = require("./enrollment.model");

const createEnrollment = ({ userId, courseId }) => save({ userId, courseId });

const getAllEnrollments = () => findAll();

const getUserEnrollments = (userId) => findByUser(userId);

module.exports = { createEnrollment, getAllEnrollments, getUserEnrollments };
