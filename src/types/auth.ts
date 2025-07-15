export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    name?: string;
    phoneNumber?: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
}

export interface AgreementState {
    ageVerification: boolean;
    termsOfService: boolean;
    marketingMessages: boolean;
    promotionalContent: boolean;
}

export interface FindIdFormData {
    name: string;
    phoneNumber: string;
}

export interface ResetPasswordFormData {
    email: string;
    newPassword: string;
    confirmPassword: string;
}

export interface AuthResponse {
    success: boolean;
    error?: string;
    user?: User;
    token?: string;
}

export interface FindIdResponse {
    success: boolean;
    userId?: string;
    message?: string;
}

export interface FormErrors {
    [key: string]: string;
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<AuthResponse>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}