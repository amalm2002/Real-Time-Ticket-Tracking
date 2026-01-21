import { User } from "../../entities/user.entities";

export interface IUserRepository {
  findAllUsers(): Promise<User[]>;
  findOneById(userId: string): Promise<User | null>;
  updateUserToken(userId: string, token: string): Promise<void>;
}
