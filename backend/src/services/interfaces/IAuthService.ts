import { SignUpDto, LoginDto, AuthResponseDto } from "../../dto/UserDTO";

export interface IAuthService {
    signup(data: SignUpDto): Promise<AuthResponseDto>;
    login(data: LoginDto): Promise<AuthResponseDto>;
}
