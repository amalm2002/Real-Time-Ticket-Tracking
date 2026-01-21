import { User } from "../../entities/user.entities";

export interface IUserRepository {
  findAllUsers(): Promise<User[]>;
}
