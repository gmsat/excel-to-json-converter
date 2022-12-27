import express from "express";
import UserController from "./UserController";

const user = new UserController();
const userRoutes = express.Router();

userRoutes
  .get("/all", user.getAll)
  .get("/test", user.testUserRoute)
  .get("/:id", user.getUser)
  .post("/", user.createUser)
  .put("/:id", user.updateUser)
  .delete("/:id", user.deleteUser)

export { userRoutes };