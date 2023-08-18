import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import { updateFullNameDto, updatePasswordDto } from './dto/update.dto';
export declare class AuthService {
    private jwtService;
    private prismaService;
    constructor(jwtService: JwtService, prismaService: PrismaService);
    register(register: RegisterDto): Promise<any>;
    login(loginDto: LoginDto): Promise<any>;
    logout(userId: number): Promise<{
        code: number;
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
    generateToken(user: any): Promise<string>;
    validateUser(payload: any): Promise<any>;
}
