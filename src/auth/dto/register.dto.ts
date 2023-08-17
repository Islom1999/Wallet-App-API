import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: String,
    description: "foydalanuvchi ism familiyasi",
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    type: String,
    description: "unique bo'lgan email",
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: "foydalanuvchi paroli minimal 6 ta belgi",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
