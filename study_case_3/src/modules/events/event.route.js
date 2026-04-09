const { Router } = require("express");
const { listEvents, getEvent } = require("./event.controller");

const router = Router();

router.get("/",    listEvents);
router.get("/:id", getEvent);

module.exports = router;
