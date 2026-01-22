  import { IAuthRepository } from "../interfaces/IAuthRepository";
  import { User } from "../../entities/user.entities";
  import { AppDataSource } from "../../config/sql.connection";

  export class AuthRepository implements IAuthRepository {
    private _repo = AppDataSource.getRepository(User);

    async findByEmail(email: string): Promise<User | null> {
      return await this._repo.findOneBy({ email });
    }

    async createUser(user: Partial<User>): Promise<User> {
      const newUser = this._repo.create(user);
      return await this._repo.save(newUser);
    }

    async countUsers(): Promise<number> {
      return await this._repo.count();
    }
  }
