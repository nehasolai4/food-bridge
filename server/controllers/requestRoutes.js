const express = require("express");
const router = express.Router();

const { createRequest } = require("../controllers/requestController");

router.post("/", createRequest);

module.exports = router;

const { signup, login, getUsers } = require("../controllers/authController");

router.get("/users", getUsers);