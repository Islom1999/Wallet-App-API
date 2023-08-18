import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { updateFullNameDto, updatePasswordDto } from './dto/update.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<any>;
    login(loginDto: LoginDto): Promise<any>;
    logout(userId: number): Promise<{
        code: number;
        message: string;
    }>;
    protectedRoute(): Promise<{
        message: string;
    }>;
    getProfile(userId: number): Promise<{
        code: number;
        data: {
            id: number;
            fullName: string;
            email: string;
            token: string;
        };
        message: string;
    }>;
    updateProfileFullname(userId: number, updateDto: updateFullNameDto): Promise<{
        code: number;
        data: {
            fullName: string;
            email: string;
            password: string;
            id: number;
            token: string;
        } & {};
        message: string;
    }>;
    updateProfilePassword(userId: number, updateDto: updatePasswordDto): Promise<{
        code: number;
        data: {
            fullName: string;
            email: string;
            password: string;
            id: number;
            token: string;
        } & {};
        message: string;
    }>;
}
