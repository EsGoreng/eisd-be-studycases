const { Router } = require("express");
const { bookTicket, listOrders } = require("./order.controller");

const router = Router();

router.post("/", bookTicket);
router.get("/", listOrders);

module.exports = router;
