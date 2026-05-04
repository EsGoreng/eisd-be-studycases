const { findById: findCourse } = require("../courses/course.model");
const { findById: findUser } = require("../users/user.model");
const { findCompletedByUserAndCourse } = require("./enrollment.model");
const { error } = require("../../core/utils/response");

const enrolledGuard = (req, res, next) => {
  const { userId, courseId } = req.body;
  const ts = new Date().toISOString();

  if (!userId || !courseId) {
    return error(res, "Field 'userId' dan 'courseId' wajib diisi.", 400);
  }

  const user = findUser(userId);
  if (!user) {
    return error(res, `User '${userId}' tidak ditemukan.`, 404);
  }

  const course = findCourse(courseId);
  if (!course) {
    return error(res, `Course '${courseId}' tidak ditemukan.`, 404);
  }

  if (course.prerequisiteId) {
    const prereq = findCourse(course.prerequisiteId);
    const isCompleted = findCompletedByUserAndCourse(
      userId,
      course.prerequisiteId,
    );

    if (!isCompleted) {
      console.log(
        `[${ts}] ✗ User '${user.name}' mencoba bypass kelas prasyarat ` +
          `'${prereq?.title}' untuk mengambil '${course.title}'`,
      );
      return error(
        res,
        `Kamu harus menyelesaikan '${prereq?.title}' terlebih dahulu sebelum mengambil '${course.title}'.`,
        403,
      );
    }
  }

  req.validatedUser = user;
  req.validatedCourse = course;
  next();
};

module.exports = { enrolledGuard };
