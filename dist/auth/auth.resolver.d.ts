import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    loginAdmin(loginAdminInput: LoginInput, context: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    logoutAdmin(context: any): Promise<string>;
    refresh(context: any): Promise<string>;
}
