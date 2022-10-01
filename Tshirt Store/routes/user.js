const express = require("express");
const router = express.Router();
const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

// Open own profile
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

// Changing my profile
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

// All the orders of users
router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
