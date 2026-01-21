// Request DTO for Signup
export interface SignUpDto {
    name: string;
    email: string;
    password: string;
}
// Request DTO for Login
export interface LoginDto {
    email: string;
    password: string;
}
// Response DTO for authentication
export interface AuthResponseDto {
    id: string;
    name: string;
    email: string;
    userType: string;
}

// Response DTO for admin user list
export interface UserListResponseDto {
  id: string;
  name: string;
  email: string;
  userType: string;
  token: string | null;
}

// Response DTO for single user
export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  userType: string;
  token: string | null;
}

// Token assignment response
export interface AssignTokenResponseDto {
  userId: string;
  token: string;
}
