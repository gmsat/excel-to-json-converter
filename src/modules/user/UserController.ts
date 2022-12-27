import { Response, Request } from "express";

class UserController {
  async getUser(req: Request, res: Response) {
    const {id} = req.params;

    res.json(`Get user with id ${id}`);
  }

  async getAll(req: Request, res: Response) {
    res.json(`Get all users`);
  }

  async createUser(req: Request, res: Response) {
    const {username, email, password} = req.body;

    res.json({success: true, message: `New user created`, user: username, email, password});
  }

  async updateUser(req: Request, res: Response) {
    const {id} = req.params;

    res.json(`Update user with id ${id}`);
  }

  async deleteUser(req: Request, res: Response) {
    const {id} = req.params;

    res.json(`Delete user with id ${id}`);
  }

  async testUserRoute(req: Request, res: Response) {
    res.json(`Test successful!!!`);
  }
}

export default UserController;