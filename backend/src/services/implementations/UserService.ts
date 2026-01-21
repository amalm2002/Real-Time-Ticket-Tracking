import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

import { STATUS_CODES } from "../../constants/statusCodes";
import { MESSAGES } from "../../constants/messages";
import { AssignTokenResponseDto, UserListResponseDto, UserResponseDto } from "../../dto/UserDTO";

export class UserService implements IUserService {
  constructor(private userRepo: IUserRepository) {}

  async getAllUsers(): Promise<UserListResponseDto[]> {
    const users = await this.userRepo.findAllUsers();

    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.user_type,
      token: user.token ?? null
    }));
  }

  async getUserById(userId: string): Promise<UserResponseDto> {
    const user = await this.userRepo.findOneById(userId);

    if (!user) {
      throw {
        status: STATUS_CODES.BAD_REQUEST,
        message: "User not found"
      };
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.user_type,
      token: user.token ?? null
    };
  }

  async assignToken(userId: string): Promise<AssignTokenResponseDto> {
    const user = await this.userRepo.findOneById(userId);

    if (!user) {
      throw {
        status: STATUS_CODES.BAD_REQUEST,
        message: "User not found"
      };
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();

    await this.userRepo.updateUserToken(userId, token);

    return { userId, token };
  }
}
