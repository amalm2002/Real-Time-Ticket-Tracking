import { AssignTokenResponseDto, UserListResponseDto, UserResponseDto } from "../../dto/UserDTO";


export interface IUserService {
  getAllUsers(): Promise<UserListResponseDto[]>;
  getUserById(userId: string): Promise<UserResponseDto>;
  assignToken(userId: string): Promise<AssignTokenResponseDto>;
}
