import express from "express";
import PostController from "./PostController";

const c = new PostController();
const postRoutes = express.Router();

postRoutes
  .get("/all", c.getAll)
  .get("/:id", c.getPost)
  .post("/", c.createPost)
  .put("/:id", c.updatePost)
  .delete("/:id", c.deletePost)

export {postRoutes};