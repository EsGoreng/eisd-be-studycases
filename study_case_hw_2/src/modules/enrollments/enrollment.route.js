const { Router } = require("express");
const { logger } = require("../../core/middlewares/logger");
const { enroll, listEnrollments } = require("./enrollment.controller");

const router = Router();

// TODO: Setelah enrolled.guard.js selesai diimplementasikan,
//       tambahkan enrolledGuard ke dalam chain di bawah ini:
//       router.post("/", logger, enrolledGuard, enroll);
router.post("/", logger, enroll);
router.get("/",  logger, listEnrollments);

module.exports = router;
