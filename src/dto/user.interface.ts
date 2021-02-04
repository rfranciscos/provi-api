export interface User {
  id: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserResponse = Omit<User, 'password'>;
