import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { STATUS_CODES } from "../../constants/statusCodes";
import { AssignTokenResponseDto, UserListResponseDto, UserResponseDto } from "../../dto/UserDTO";
import { MESSAGES } from "../../constants/messages";

export class UserService implements IUserService {
  constructor(private _userRepo: IUserRepository) { }

  async getAllUsers(): Promise<UserListResponseDto[]> {
    const users = await this._userRepo.findAllUsers();

    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.user_type,
      token: user.token ?? null
    }));
  }

  async getUserById(userId: string): Promise<UserResponseDto> {
    const user = await this._userRepo.findOneById(userId);

    if (!user) {
      throw {
        status: STATUS_CODES.BAD_REQUEST,
        message: MESSAGES.USER_NOT_FOUND
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
    const user = await this._userRepo.findOneById(userId);

    if (!user) {
      throw {
        status: STATUS_CODES.BAD_REQUEST,
        message: MESSAGES.USER_NOT_FOUND
      };
    }

    // Random token generating once the admin trigger the api call
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    await this._userRepo.updateUserToken(userId, token);

    return { userId, token };
  }
}
