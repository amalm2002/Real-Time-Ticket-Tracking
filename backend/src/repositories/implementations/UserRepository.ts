import { IUserRepository } from "../interfaces/IUserRepository";
import { User, UserType } from "../../entities/user.entities";
import { AppDataSource } from "../../config/sql.connection";

export class UserRepository implements IUserRepository {
    private _repo = AppDataSource.getRepository(User);


    async findAllUsers(): Promise<User[]> {
        return await this._repo
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.tokens", "token")
            .where("user.user_type = :type", { type: UserType.USER })
            .getMany();
    }

}
