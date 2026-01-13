const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  payOrder,
  getOrderHistory,
  getAllOrdersHistory,
} = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, createOrder);
router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/:id", authMiddleware, getOrderById);
router.get("/", authMiddleware, roleMiddleware("admin"), getAllOrders); // Admin only
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateOrderStatus
); // NEW
router.put("/:id/pay", authMiddleware, payOrder); // user payment update
router.get("/history", authMiddleware, getOrderHistory); // user own orders
router.get(
  "/admin/history",
  authMiddleware,
  roleMiddleware("admin"),
  getAllOrdersHistory
); // admin all orders

module.exports = router;
