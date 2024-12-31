export interface LoginResponse {
  token: string;
  email: string;
  roles: string[];
}
export interface ILoggedInUser {
  success: boolean
  message: string
  data: LoginResponse
}
