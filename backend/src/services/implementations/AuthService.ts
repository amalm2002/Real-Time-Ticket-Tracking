import bcrypt from 'bcrypt';
import { IAuthService } from '../interfaces/IAuthService';
import { IAuthRepository } from '../../repositories/interfaces/IAuthRepository';
import { SignUpDto, LoginDto, AuthResponseDto } from "../../dto/UserDTO";
import { STATUS_CODES } from "../../constants/statusCodes";
import { MESSAGES } from "../../constants/messages";
import { UserType } from '../../entities/user.entities';

export class AuthService implements IAuthService {

  constructor(private _authRepo: IAuthRepository) {}

  async signup(data: SignUpDto): Promise<AuthResponseDto> {
    const existingUser = await this._authRepo.findByEmail(data.email);
    if (existingUser) {
      throw { status: STATUS_CODES.CONFLICT, message: MESSAGES.USER_EXISTS };
    }

    // Check if first user (first user will be admin)
    const userCount = await this._authRepo.countUsers();
    const userType = userCount === 0 ? UserType.ADMIN : UserType.USER;

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this._authRepo.createUser({ ...data, password: hashedPassword, user_type: userType });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.user_type
    };
  }

  async login(data: LoginDto): Promise<AuthResponseDto> {
    const user = await this._authRepo.findByEmail(data.email);
    if (!user) {
      throw { status: STATUS_CODES.UNAUTHORIZED, message: MESSAGES.INVALID_CREDENTIALS };
    }

    const match = await bcrypt.compare(data.password, user.password);
    if (!match) {
      throw { status: STATUS_CODES.UNAUTHORIZED, message: MESSAGES.INVALID_CREDENTIALS };
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.user_type
    };
  }
}
