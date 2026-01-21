import { User } from "../../entities/user.entities";

export interface IUserRepository {
  findAllUsers(): Promise<User[]>;
  updateUserToken(userId: string, token: string): Promise<void>;
  findOneById(userId: string): Promise<User | null>;
}
