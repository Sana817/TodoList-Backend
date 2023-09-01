const express = require("express");
const router = express.Router();
const todoController = require("../Controllers/TodoController");
const userAuthentication = require("../Middleware/userAuthentication");

router.get("/", userAuthentication, todoController.getAllTasks);
router.post("/addTask", userAuthentication, todoController.addTask);
router.put("/updateTask/:id", userAuthentication, todoController.updateTask);
router.delete("/removeTask/:id", userAuthentication, todoController.removeTask);

module.exports = router;
