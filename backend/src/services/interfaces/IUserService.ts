import { User } from "../../entities/user.entities";

export interface IUserService {
  getAllUsers(): Promise<User[]>;
}
