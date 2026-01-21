export interface SignUpDto {
    name: string;
    email: string;
    password: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface AuthResponseDto {
    id: string;
    name: string;
    email: string;
    userType: string;
}