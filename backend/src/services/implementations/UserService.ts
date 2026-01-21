import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

export class UserService implements IUserService {
  constructor(private _userRepo: IUserRepository) {}

  async getAllUsers() {
    const x = await this._userRepo.findAllUsers();
    return x
  }
}
