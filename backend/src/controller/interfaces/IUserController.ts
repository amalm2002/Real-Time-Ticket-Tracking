import { Request, Response } from "express";

export interface IUserController {
  getAllUsers(req: Request, res: Response): Promise<void>;
  assignToken(req: Request, res: Response): Promise<void>;
}
