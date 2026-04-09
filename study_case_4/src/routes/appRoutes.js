const { Router } = require("express");
const { getApp } = require("../controllers/appController");

const router = Router();

router.get("/app", getApp);

module.exports = router;
