const express = require("express");
const router = express.Router();

const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStaus,
  updateStatus,
} = require("../controllers/order");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getUserById,
  pushOrderInPurchaseList,
  getUser,
} = require("../controllers/user");
const { updateStock } = require("../controllers/product");

// PARAMs
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// Actual Routes

// Create Order
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

// Get all Orders
router.get(
  "order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

// Status of order
router.get(
  "order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStaus
);

router.put(
  "order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
