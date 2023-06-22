import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService, private prismaService: PrismaService) {}

  async register(register: RegisterDto): Promise<any> {
    const user = await this.prismaService.user.findUnique({ where: { email: register.email } });
    if(user){
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const password = await bcrypt.hash(register.password, 10);
    const data = {
        fullName: register.fullName,
        email: register.email,
        password,
    }
    const newUser = await this.prismaService.user.create({data})
    
    return {status: 200, message: "User Registrated", data: newUser};
  }

  async login(loginDto: LoginDto): Promise<any> {
    let user = await this.prismaService.user.findUnique({ where: { email: loginDto.email } });

    if(!user){
        throw new HttpException('User not found', HttpStatus.NOT_FOUND); 
    }

    const valid = await bcrypt.compare(loginDto.password, user.password);

    if(!valid){
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    const token = await this.generateToken({name: user.fullName, email: user.email});

    user = await this.prismaService.user.update({data: {token}, where: {email: loginDto.email} });

    user.password = undefined

    return {code: 201, message: "User Logined Token Seted", data: user};
  }

  async generateToken(user: any): Promise<string> {
    return this.jwtService.sign(user);
  }

  async validateUser(payload: any): Promise<any> {
    const user = this.prismaService.user.findUnique({ where: { email: payload.email } });
    return user;
  }
}
