import { Response, Request } from "express";

class PostController {
  async getPost(req: Request, res: Response) {
    res.json("Get one post");
  }

  async getAll(req: Request, res: Response) {
    res.json("Get all Posts");
  }

  async createPost(req: Request, res: Response) {
    res.json("Create new post");
  }

  async updatePost(req: Request, res: Response) {
    res.json("Update post");
  }

  async deletePost(req: Request, res: Response) {
    res.json("Delete a post");
  }
}

export default PostController;