import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

export class UserService implements IUserService {
    constructor(private _userRepo: IUserRepository) { }

    async getAllUsers() {
        return await this._userRepo.findAllUsers();
    }
}
