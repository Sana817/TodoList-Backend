import { Request,Response, } from "express";
const todoListModel = require("../Models/TodoListModel");

interface RequestWithUser extends Request {
  user: {
    userId: string;
  };
}

const getAllTasks= async (req:RequestWithUser, res:Response) => {
  const user = req.user.userId;
  try {
    const result = await todoListModel.find({ user: user });
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: "Could not fetch tasks." });
  }
};

const addTask = async (req:RequestWithUser, res:Response) => {
  const { task, editing } = req.body;
  console.log("task",task);
  const user = req.user.userId;
  try {
    
    const newTask = new todoListModel({ user: user, task, editing });
    const result = await newTask.save();
    if (result) res.json(result);
  } catch (error) {
    res.status(500).send({ error: "Could not add task." });
  }
};

const removeTask = async (req:Request, res:Response) => {
  const id = req.params.id;
  try {
    const result = await todoListModel.findByIdAndDelete(id);
    if (result) res.json(result);
  } catch (error) {
    res.status(500).send({ error: "Task could not be deleted" });
  }
};

const updateTask = async (req:Request, res:Response) => {
  const { task, editing } = req.body;

  try {
    const result = await todoListModel.findByIdAndUpdate(
      req.params.id,
      { task, editing },
      { new: true }
    );

    if (result) res.json(result);
  } catch (error) {
    res.status(500).send({ error: "Could not update task." });
  }
};

module.exports = { getAllTasks, addTask, updateTask, removeTask };
