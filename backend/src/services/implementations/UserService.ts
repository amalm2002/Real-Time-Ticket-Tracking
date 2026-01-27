import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { STATUS_CODES } from "../../constants/statusCodes";
import { AssignTokenResponseDto, UserListResponseDto, UserResponseDto } from "../../dto/UserDTO";
import { MESSAGES } from "../../constants/messages";
import { ITokenRepository } from "../../repositories/interfaces/ITokenRepository";
import { TokenStatus } from "../../entities/token.entities";

export class UserService implements IUserService {
  constructor(
    private _userRepo: IUserRepository,
    private _tokenRepo: ITokenRepository
  ) { }

  async getAllUsers(): Promise<UserListResponseDto[]> {
    const users = await this._userRepo.findAllUsers();
    // console.log('usersss :', users)
    return users.map(user => {
      let latestToken = null;

      if (user.tokens && user.tokens.length > 0) {
        const sortedTokens = user.tokens
          .filter(t => t.status === "ACTIVE")
          .sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        latestToken = sortedTokens[0]?.token ?? null;
      }
      console.log(latestToken, 'latestToken')
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.user_type,
        token: latestToken,
      };
    });
  }

  async getUserById(userId: string): Promise<UserResponseDto> {
    const user = await this._userRepo.findOneById(userId);
    const token = await this._tokenRepo.findOneById(userId)

    // console.log('this is the token of the user :', token)

    if (!user) {
      throw {
        status: STATUS_CODES.BAD_REQUEST,
        message: MESSAGES.USER_NOT_FOUND
      };
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.user_type,
      token: token.token ?? null
    };
  }

  async getUserTokens(userId: string): Promise<any> {
    const tokens = await this._tokenRepo.findTokensByUserId(userId);

    return tokens.map((token: any) => ({
      id: token.id,
      token: token.token,
      status: token.status,
      createdAt: token.createdAt,
    }));
  }


  async assignToken(userId: string): Promise<AssignTokenResponseDto> {
    const user = await this._userRepo.findOneById(userId);

    if (!user) {
      throw {
        status: STATUS_CODES.BAD_REQUEST,
        message: MESSAGES.USER_NOT_FOUND
      };
    }

    // Random token generating once the admin trigger the api call
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    // await this._userRepo.updateUserToken(userId, token)

    const deactiveTokenUser = await this._tokenRepo.deactivateAllUserTokens(userId);
    console.log('deactiveTokenUser :', deactiveTokenUser)

    const savedUserTokenOnDB = await this._tokenRepo.createToken({
      token: token,
      assignedUserId: userId,
    });

    // console.log('savedUserTokenDB :', savedUserTokenOnDB)

    return { userId, token };
  }
}
