export interface User {
  email: string;
  roles: string[];
}

export interface dropDownMenuItems {
  text:string;
  link:string
}

export interface RegistrationResponseDto {
  isSuccessfulRegistration: boolean;
  errros: string[];
}

export interface UserForRegistrationDto {
  firstName: string;
  lastName: string;
  "address": string,
  "isRegularUser": boolean,
  "phoneNumber":string,
  "email": string,
  "role": string,
  password: string;
  confirmPassword: string;
}