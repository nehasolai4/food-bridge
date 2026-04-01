const express = require("express");
const router = express.Router();

const { signup, login, getUsers } = require("../controllers/authController");

// existing routes
router.post("/signup", signup);
router.post("/login", login);

// 🔥 ADD THIS
router.get("/users", getUsers);

module.exports = router;