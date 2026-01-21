import { IUserRepository } from "../interfaces/IUserRepository";
import { User, UserType } from "../../entities/user.entities";
import { AppDataSource } from "../../config/sql.connection";

export class UserRepository implements IUserRepository {
  private repo = AppDataSource.getRepository(User);

  async findAllUsers(): Promise<User[]> {
    return this.repo.find({
      where: { user_type: UserType.USER },
      select: ["id", "name", "email", "token", "user_type"],
    });
  }

  async findOneById(userId: string): Promise<User | null> {
    return this.repo.findOneBy({ id: userId });
  }

  async updateUserToken(userId: string, token: string): Promise<void> {
    await this.repo.update(userId, { token });
  }
}
