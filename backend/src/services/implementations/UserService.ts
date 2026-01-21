import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

export class UserService implements IUserService {
  constructor(private userRepo: IUserRepository) {}

  async getAllUsers() {
    return this.userRepo.findAllUsers();
  }

  async getUserById(userId: string) {
    const user = await this.userRepo.findOneById(userId);
    if (!user) throw new Error("User not found");
    return user;
  }

  async updateUserToken(userId: string, token: string) {
    await this.userRepo.updateUserToken(userId, token);
    return this.getUserById(userId);
  }
}
