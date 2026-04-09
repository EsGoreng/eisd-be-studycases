const { Router } = require("express");
const { logger } = require("../../core/middlewares/logger");
const { listUsers, getUser } = require("./user.controller");

const router = Router();

router.get("/",    logger, listUsers);
router.get("/:id", logger, getUser);

module.exports = router;
