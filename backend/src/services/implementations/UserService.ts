import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

export class UserService implements IUserService {
  constructor(private _userRepo: IUserRepository) {}

  async getAllUsers() {
    return await this._userRepo.findAllUsers();
  }

  async updateUserToken(userId: string, token: string) {
    await this._userRepo.updateUserToken(userId, token);
    const updatedUser = await this._userRepo.findOneById(userId);
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  }
}
