const express = require("express");
const router = express.Router();
const todoController = require("../Controllers/userController");

router.post("/login", todoController.Login);
router.post("/signup", todoController.Signup);

module.exports = router;
