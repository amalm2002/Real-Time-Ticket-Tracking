import { User } from "../../entities/user.entities";

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(user: Partial<User>): Promise<User>;
  countUsers(): Promise<number>;
}
