import express from "express";
import { userRoutes } from "./modules/user/UserRoutes";

const routes = express.Router();

routes.use("/user", userRoutes);

export default routes;