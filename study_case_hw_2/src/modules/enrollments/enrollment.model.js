/**
 * In-memory enrollment storage.
 * Status: "ACTIVE" | "COMPLETED" | "DROPPED"
 *
 * Pre-seeded data untuk keperluan testing:
 *   Alice (USR-001) sudah COMPLETED JS-101  → boleh ambil NODE-201
 *   Bob   (USR-002) masih ACTIVE  di JS-101 → belum boleh ambil NODE-201
 *   Charlie tidak punya enrollment apapun   → belum boleh ambil NODE-201
 */
const enrollments = [
  { id: "ENR-001", userId: "USR-001", courseId: "JS-101",   status: "COMPLETED", enrolledAt: "2026-01-10T08:00:00.000Z" },
  { id: "ENR-002", userId: "USR-002", courseId: "JS-101",   status: "ACTIVE",    enrolledAt: "2026-03-01T08:00:00.000Z" },
];
let nextId = 3;

const save = ({ userId, courseId }) => {
  const enrollment = {
    id: `ENR-${String(nextId++).padStart(3, "0")}`,
    userId,
    courseId,
    status: "ACTIVE",
    enrolledAt: new Date().toISOString(),
  };
  enrollments.push(enrollment);
  return enrollment;
};

const findAll = () => enrollments;

const findByUser = (userId) => enrollments.filter((e) => e.userId === userId);

const findByUserAndCourse = (userId, courseId) =>
  enrollments.find((e) => e.userId === userId && e.courseId === courseId) || null;

const findCompletedByUserAndCourse = (userId, courseId) =>
  enrollments.find(
    (e) => e.userId === userId && e.courseId === courseId && e.status === "COMPLETED"
  ) || null;

module.exports = { save, findAll, findByUser, findByUserAndCourse, findCompletedByUserAndCourse };
