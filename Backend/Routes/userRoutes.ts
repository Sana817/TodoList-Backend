const useExpress = require("express");
const userRouter = useExpress.Router();
const todoListController = require("../Controllers/userController");

userRouter.post("/login", todoListController.Login);
userRouter.post("/signup", todoListController.Signup);

module.exports = userRouter;
