const jwt = require("jsonwebtoken");
import { Response,NextFunction } from "express";
interface RequestBody{
  [x: string]: any;
  user:string
}
module.exports = (req:RequestBody, res:Response, next:NextFunction) => {
  try {
    const token = req.header("user-authentication");
    if (!token) return res.status(403).send("Access denied.");
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
