import { IUserController } from "../interfaces/IUserController";
import { IUserService } from "../../services/interfaces/IUserService";
import { Request, Response } from "express";
import { emitToUser } from "../../sockets/socket";

export class UserController implements IUserController {
  constructor(private userService: IUserService) { }

  async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    res.status(200).json({ data: users });
  }

  async getUserById(req: Request, res: Response) {
    const userId = req.params.userId as string;
    const user = await this.userService.getUserById(userId);
    res.status(200).json({ data: user });
  }

  async assignToken(req: Request, res: Response) {
    let { userId } = req.params;

    if (Array.isArray(userId)) userId = userId[0];

    const token = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await this.userService.updateUserToken(userId, token);

    emitToUser(userId, "token_assigned", { token });

    res.status(200).json({
      message: "Token assigned",
      data: { userId, token },
    });
  }
}
