const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/productController");
const { authenticate, authorize } = require("../middleware/auth");

router.get(
  "/",
  authenticate,
  authorize(["admin", "supplier", "customer"]),
  ctrl.list
);
router.get(
  "/:id",
  authenticate,
  authorize(["admin", "supplier", "customer"]),
  ctrl.get
);
router.post("/", authenticate, authorize(["admin", "supplier"]), ctrl.create);
router.put("/:id", authenticate, authorize(["admin", "supplier"]), ctrl.update);
router.delete("/:id", authenticate, authorize(["admin"]), ctrl.remove);

module.exports = router;
