import { AppDataSource } from "../../config/sql.connection";
import { Token, TokenStatus } from "../../entities/token.entities";
import { ITokenRepository } from "../interfaces/ITokenRepository";

export class TokenRepository implements ITokenRepository {
    private _token_repo = AppDataSource.getRepository(Token)

    async createToken(data: { token: string, assignedUserId: string; }): Promise<any> {
        console.log('token data is :', data)
        const newToken = this._token_repo.create({ token: data.token, assignedUserId: data.assignedUserId })
        return this._token_repo.save(newToken)
    }

    async deactivateAllUserTokens(userId: string): Promise<any> {
        return this._token_repo.update(
            { assignedUserId: userId },
            { status: TokenStatus.INACTIVE }
        );
    }

    async findOneById(userId: string): Promise<any> {
        return this._token_repo.findOneBy({ assignedUserId: userId });
    }

    async findTokensByUserId(userId: string): Promise<Token[]> {
        return this._token_repo.find({
            where: { assignedUserId: userId },
            order: { createdAt: "DESC" }, 
        });
    }


}