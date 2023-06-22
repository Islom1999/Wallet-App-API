import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { SharedModule } from 'src/shared/sharedModule';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'sizning-maxfiy-kalitingiz', // JWT ni imzolash uchun o'z maxfiy kalitingizni kiriting
      signOptions: { expiresIn: '1d' }, // JWT amal qilish muddati
    }),
    SharedModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
})
export class AuthModule {}
