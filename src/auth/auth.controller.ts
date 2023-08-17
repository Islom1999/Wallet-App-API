import { Controller, Post, Body, UseGuards, UsePipes, ValidationPipe, Get} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GetCurrentUserId } from 'src/decorators/get.userId';
import { updateFullNameDto, updatePasswordDto } from './dto/update.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
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
  ) {
    const user = await this.authService.login(loginDto);
    return user;
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout( @GetCurrentUserId() userId: number ) {
    return this.authService.logout(userId);
  }

  @Post('protected')
  @UseGuards(AuthGuard('jwt'))
  async protectedRoute() {
    return { 
      message: 'Siz autentifikatsiyadan o\'tdingiz', 
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile( @GetCurrentUserId() userId: number ) {
    return this.authService.getProfile(userId);
  }

  @UsePipes(new ValidationPipe())
  @Post('profile/update/fullname')
  @UseGuards(AuthGuard('jwt'))
  async updateProfileFullname( @GetCurrentUserId() userId: number, @Body() updateDto: updateFullNameDto) {
    return this.authService.updateProfileFullname(userId, updateDto);
  }

  @UsePipes(new ValidationPipe())
  @Post('profile/update/password')
  @UseGuards(AuthGuard('jwt'))
  async updateProfilePassword( @GetCurrentUserId() userId: number, @Body() updateDto: updatePasswordDto) {
    return this.authService.updateProfilePassword(userId, updateDto);
  }
}
