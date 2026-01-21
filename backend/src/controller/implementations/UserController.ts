import { IUserController } from "../interfaces/IUserController";
import { IUserService } from "../../services/interfaces/IUserService";
import { Request, Response } from "express";
import { STATUS_CODES } from "../../constants/statusCodes";
import { emitToUser } from "../../sockets/socket";

export class UserController implements IUserController {
  constructor(private _userService: IUserService) { }

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

  async assignToken(req: Request, res: Response) {
    try {
      let { userId } = req.params;

      // ✅ Ensure userId is a string
      if (Array.isArray(userId)) {
        userId = userId[0];
      }

      // 🔹 Generate random 6-digit token
      const token = Math.floor(100000 + Math.random() * 900000).toString();

      // Update user token in DB
      const user = await this._userService.updateUserToken(userId, token);

      // 🔹 Emit socket to specific user
      emitToUser(userId, "token_assigned", { token });

      res.status(STATUS_CODES.OK).json({
        message: "Token assigned successfully",
        data: { userId, token },
      });
    } catch (err: any) {
      res.status(err.status || STATUS_CODES.INTERNAL_ERROR).json({
        message: err.message || "Server Error",
      });
    }
  }

}
