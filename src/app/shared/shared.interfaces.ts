export interface AuthUser {
  username: string;
  password: string;
}
export interface RegisterUser {
  username: string;
  email: string;
  password1: string;
  password2: string;
}
export interface CurrentUser {
  pk: number;
  username: string;
  email?: string;
}
export interface JWTPayload {
  pk: number;
  username: string;
  email: string;
  exp: number;
}
