import { IUserController } from "../interfaces/IUserController";
import { IUserService } from "../../services/interfaces/IUserService";
import { Request, Response } from "express";
import { STATUS_CODES } from "../../constants/statusCodes";
import { MESSAGES } from "../../constants/messages";
import { emitToUser } from "../../sockets/socket";

export class UserController implements IUserController {

  constructor(private userService: IUserService) { }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.userService.getAllUsers();

      res.status(STATUS_CODES.OK).json({ data });
    } catch (err: any) {
      res.status(err.status || STATUS_CODES.INTERNAL_ERROR).json({
        message: err.message || MESSAGES.SERVER_ERROR
      });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      let { userId } = req.params;
      if (Array.isArray(userId)) userId = userId[0];

      const data = await this.userService.getUserById(userId);

      res.status(STATUS_CODES.OK).json({ data });
    } catch (err: any) {
      res.status(err.status || STATUS_CODES.INTERNAL_ERROR).json({
        message: err.message || MESSAGES.SERVER_ERROR
      });
    }
  }

  async assignToken(req: Request, res: Response): Promise<void> {
    try {
      let { userId } = req.params;
      if (Array.isArray(userId)) userId = userId[0];

      const data = await this.userService.assignToken(userId);

      // socket event 
      emitToUser(userId, "token_assigned", { token: data.token });

      res.status(STATUS_CODES.OK).json({
        message: "Token assigned successfully",
        data
      });
    } catch (err: any) {
      res.status(err.status || STATUS_CODES.INTERNAL_ERROR).json({
        message: err.message || MESSAGES.SERVER_ERROR
      });
    }
  }
}
