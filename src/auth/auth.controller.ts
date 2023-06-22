import { Controller, Post, Body, UseGuards, Req, Res, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {Request, Response} from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(
    @Body() loginDto: LoginDto, 
    // @Req() request,
    // @Res() response: Response
  ) {
    const user = await this.authService.login(loginDto);

    // request.session.user = user
    // response.cookie('user', 'value')

    return user;
  }

  @Post('protected')
  @UseGuards(AuthGuard('jwt'))
  async protectedRoute() {
    // console.log(request.session)
    // console.log(request.cookies); 
    return { 
      message: 'Siz autentifikatsiyadan o\'tdingiz', 
    };
  }
}
