import { IUserController } from "../interfaces/IUserController";
import { IUserService } from "../../services/interfaces/IUserService";
import { Request, Response } from "express";
import { STATUS_CODES } from "../../constants/statusCodes";

export class UserController implements IUserController {
  constructor(private _userService: IUserService) {}

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this._userService.getAllUsers();
      res.status(STATUS_CODES.OK).json({ data: users });
    } catch (err: any) {
      res.status(STATUS_CODES.INTERNAL_ERROR).json({
        message: err.message || "Server Error"
      });
    }
  }
}
