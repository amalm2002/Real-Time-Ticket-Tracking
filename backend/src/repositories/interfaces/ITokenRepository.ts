export interface ITokenRepository {
    createToken(data: { token: string, assignedUserId: string; }): Promise<any>
    deactivateAllUserTokens(userId: string): Promise<any>
    findOneById(userId: string): Promise<any>
    findTokensByUserId(userId: string): Promise<any>
}