import { Request,Response } from "express";
import userModel from "../Models/userModel";
const jwt = require("jsonwebtoken");

const Login = async (req:Request, res:Response) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
  if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const generatedToken = jwt.sign(
      { userId: user._id },
      process.env.SECRETKEY
    );
    res
      .status(200)
      .json({ message: "Login successful", token: generatedToken });
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).send({ error: "Could not login" });
  }
};

const Signup = async (req:Request, res:Response) => {
  try {
    const { userName, email, password } = req.body;
    const user = new userModel({ userName, email, password });

    const result = await user.save();
    if (result) res.status(200).json({ message: "Sign successful", result });
  } catch (error) {
    res.status(500).send({ error: "Could not Signup" });
  }
};

module.exports = {
  Login,
  Signup,
};
