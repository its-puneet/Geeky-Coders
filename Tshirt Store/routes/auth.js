const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

// Signup Route
router.post(
  "/signup",
  [
    check("email", "should be an appropriate email").isEmail(),
    check("password", "enter a valid password").isLength({ min: 3 }),
  ],
  signup
);

// Signin Route
router.post(
  "/signin",
  [
    check("email", "not a proper email").isEmail(),
    check("password", "password field is required").isLength({ min: 0 }),
  ],
  signin
);

// Signout Route
router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
