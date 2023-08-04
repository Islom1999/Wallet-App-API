import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { updateFullNameDto, updatePasswordDto  } from './dto/update.dto';

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

  async logout(userId: number) {
    await this.prismaService.user.updateMany({
      where: {
        id: userId,
        token: {
          not: null,
        },
      },
      data: {
        token: null,
      },
    });
    return {code: 204, message: "User logout",};
  }

  async getProfile (userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {id: userId},
      select: {
        id: true,
        fullName: true, 
        email: true,
        token: true,
      }
    });
    return {code: 200, data: user,};
  }

  async updateProfileFullname (userId: number, updateDto: updateFullNameDto) {
    const { fullName } = updateDto
    const user = await this.prismaService.user.update({
      where: {id: userId},
      data: {fullName}
    });

    return {code: 200, data: user,};
  }

  async updateProfilePassword(userId: number, updateDto: updatePasswordDto) {

    const { password, newPassword } = updateDto

    const user = await this.prismaService.user.findUnique({
      where: {id: userId},
    });

    const valid = await bcrypt.compare(password, user.password);

    if(!valid){
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    
    const token = await this.generateToken({name: user.fullName, email: user.email});

    const passwordHash = await bcrypt.hash(newPassword, 10);
    
    const uptadeUser = await this.prismaService.user.update({data: {token, password: passwordHash}, where: {email: user.email} });

    user.password = undefined

    return {code: 200, data: uptadeUser,};
  }

  async generateToken(user: any): Promise<string> {
    return this.jwtService.sign(user);
  }

  async validateUser(payload: any): Promise<any> {
    const user = this.prismaService.user.findUnique({ where: { email: payload.email } });
    return user;
  }
}
