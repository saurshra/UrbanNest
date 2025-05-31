const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const isAuthenticated = require("../middleware/protectRoute");

router.post("/signup", controller.postSignup);
router.post("/login", controller.postLogin);
router.post("/logout", controller.logout);

router.get("/profile", isAuthenticated, (req, res) => {
  res.json({ message: "Welcome to home", user: req.session.user });
});

module.exports = router;
