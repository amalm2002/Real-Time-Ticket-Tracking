export enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  assignedToken?: string;
}
