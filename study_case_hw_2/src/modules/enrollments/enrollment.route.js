const { Router } = require("express");
const { logger } = require("../../core/middlewares/logger");
const { enrolledGuard } = require("./enrolled.guard");
const { enroll, listEnrollments } = require("./enrollment.controller");

const router = Router();

router.get("/hello", (req, res) => res.json({ message: "hello ganteng" }));
router.post("/", logger, enrolledGuard, enroll);
router.get("/", logger, listEnrollments);

module.exports = router;
