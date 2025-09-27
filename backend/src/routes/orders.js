const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/orderController");
const { authenticate, authorize } = require("../middleware/auth");

router.get("/", authenticate, authorize(["admin", "customer"]), ctrl.getOrders);
router.get(
  "/:id",
  authenticate,
  authorize(["admin", "customer"]),
  ctrl.getOrderById
);
router.post(
  "/",
  authenticate,
  authorize(["admin", "customer"]),
  ctrl.createOrder
);
router.put("/:id", authenticate, authorize(["admin"]), ctrl.updateOrder);
router.delete("/:id", authenticate, authorize(["admin"]), ctrl.deleteOrder);

module.exports = router;
