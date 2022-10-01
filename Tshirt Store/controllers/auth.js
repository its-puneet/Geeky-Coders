const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

// Siginup Route
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.json({
      name: user.name,

      email: user.email,
      id: user._id,
    });
  });
};

// Signin Route
exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER NOT FOUND",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "EMAIL AND PASSWORD DO NOT MATCH",
      });
    }

    // Create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // Putting token in cookies
    res.cookie("token", token, { expire: new Date() + 9999 });

    // Send response to front end
    const { _id, name, email, role } = user;
    res.json({ token, user: { _id, name, email, role } });
  });
};

// Signout Route
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    msg: "USER SGINED OUT",
  });
};

// Protected Routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

// Custom Middlewares

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: "YOU ARE NOT AN ADMIN",
    });
  }
  next();
};
