import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: "unique bo'lgan email",
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: "foydalanuvchi paroli minimal 6 ta belgi",
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;
}
