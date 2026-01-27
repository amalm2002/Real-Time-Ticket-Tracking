import { AssignTokenResponseDto, UserListResponseDto, UserResponseDto } from "../../dto/UserDTO";


export interface IUserService {
  getAllUsers(): Promise<UserListResponseDto[]>;
  getUserById(userId: string): Promise<UserResponseDto>;
  getUserTokens(userId:string):Promise<any>
  assignToken(userId: string): Promise<AssignTokenResponseDto>;
}
