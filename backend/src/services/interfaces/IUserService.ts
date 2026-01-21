import { User } from "../../entities/user.entities";

export interface IUserService {
  getAllUsers(): Promise<User[]>;
  updateUserToken(userId: string, token: string): Promise<User>;
}
