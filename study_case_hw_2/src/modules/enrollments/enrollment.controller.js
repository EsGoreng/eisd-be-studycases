const { findById: findCourse } = require("../courses/course.model");
const { findById: findUser }   = require("../users/user.model");
const { save, findAll, findByUser, findByUserAndCourse, findCompletedByUserAndCourse } = require("./enrollment.model");

const enroll = (req, res) => {
  const { userId, courseId } = req.body;
  const ts = new Date().toISOString();

  console.log(`[${ts}] POST /api/enrollments | Body: ${JSON.stringify(req.body)}`);

  if (!userId || !courseId) {
    return res.status(400).json({ status: "error", message: "Field 'userId' dan 'courseId' wajib diisi.", data: null });
  }

  const user = findUser(userId);
  if (!user) {
    return res.status(404).json({ status: "error", message: `User '${userId}' tidak ditemukan.`, data: null });
  }

  const course = findCourse(courseId);
  if (!course) {
    return res.status(404).json({ status: "error", message: `Course '${courseId}' tidak ditemukan.`, data: null });
  }

  if (findByUserAndCourse(userId, courseId)) {
    return res.status(409).json({ status: "error", message: `User '${user.name}' sudah terdaftar di course ini.`, data: null });
  }

  if (course.prerequisiteId) {
    const prereq = findCourse(course.prerequisiteId);
    const isCompleted = findCompletedByUserAndCourse(userId, course.prerequisiteId);

    if (!isCompleted) {
      console.log(`[${ts}] ✗ User '${user.name}' mencoba bypass kelas prasyarat '${prereq?.title}' untuk mengambil '${course.title}'`);
      return res.status(403).json({
        status: "error",
        message: `Kamu harus menyelesaikan '${prereq?.title}' terlebih dahulu sebelum mengambil '${course.title}'.`,
        data: null,
      });
    }
  }

  const enrollment = save({ userId, courseId });
  console.log(`[${ts}] ✓ Enrollment berhasil — '${user.name}' terdaftar di '${course.title}'`);

  return res.status(201).json({
    status: "success",
    message: `Berhasil mendaftar ke course '${course.title}'.`,
    data: { enrollment, user: { id: user.id, name: user.name }, course: { id: course.id, title: course.title } },
  });
};

const listEnrollments = (req, res) => {
  const { userId } = req.query;
  const data = userId ? findByUser(userId) : findAll();
  return res.status(200).json({ status: "success", message: "Daftar enrollment.", data });
};

module.exports = { enroll, listEnrollments };
