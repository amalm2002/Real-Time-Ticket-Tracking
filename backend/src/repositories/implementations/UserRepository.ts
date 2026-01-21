import { IUserRepository } from "../interfaces/IUserRepository";
import { User, UserType } from "../../entities/user.entities";
import { AppDataSource } from "../../config/sql.connection";

export class UserRepository implements IUserRepository {
  private _repo = AppDataSource.getRepository(User);

  async findAllUsers(): Promise<User[]> {
    return await this._repo.find({
      where: { user_type: UserType.USER },
      select: ["id", "name", "email", "user_type", "token"]
    });
  }

  async updateUserToken(userId: string, token: string): Promise<void> {
    await this._repo.update(userId, { token });
  }

  async findOneById(userId: string): Promise<User | null> {
    return await this._repo.findOneBy({ id: userId });
  }
}
