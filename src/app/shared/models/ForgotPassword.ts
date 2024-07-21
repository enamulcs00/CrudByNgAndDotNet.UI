export interface ForgotPassword {
    email: string;
    clientURI?: string;
}

export interface ResetPasswordDto {
    password: string;
    confirmPassword: string;
    email: string;
    token: string;
}

export interface ResetPasswordRequest {
    password: string;
    confirmPassword: string;
    email: string;
}