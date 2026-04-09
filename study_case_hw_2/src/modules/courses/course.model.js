/**
 * In-memory course storage.
 *
 * prerequisiteId: courseId yang harus berstatus COMPLETED sebelum
 *                 siswa boleh mendaftar ke course ini. null = bebas diambil.
 */
const courses = [
  { id: "JS-101",    title: "Basic JavaScript",    level: "beginner",      prerequisiteId: null },
  { id: "NODE-201",  title: "Advanced Node.js",    level: "intermediate",  prerequisiteId: "JS-101" },
  { id: "REACT-201", title: "React Fundamentals",  level: "intermediate",  prerequisiteId: "JS-101" },
  { id: "NODE-301",  title: "Node.js Expert",       level: "advanced",      prerequisiteId: "NODE-201" },
];

const findById  = (id) => courses.find((c) => c.id === id) || null;
const findAll   = ()   => courses;

module.exports = { findById, findAll };
