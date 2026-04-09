const { Router } = require("express");
const { logger } = require("../../core/middlewares/logger");
const { listCourses, getCourse } = require("./course.controller");

const router = Router();

router.get("/",    logger, listCourses);
router.get("/:id", logger, getCourse);

module.exports = router;
