import { Request, Response } from "express";

export interface IUserController {
  getAllUsers(req: Request, res: Response): Promise<void>;
  getUserById(req: Request, res: Response): Promise<void>;
  assignToken(req: Request, res: Response): Promise<void>;
  getUserTokens(req: Request, res: Response): Promise<void>;
}
