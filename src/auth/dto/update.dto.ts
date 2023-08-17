import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class updateFullNameDto {
  @ApiProperty({
    type: String,
    description: "foydalanuvchi ism familiyasi",
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;
}


export class updatePasswordDto {
    @ApiProperty({
      type: String,
      description: "unique bo'lgan email",
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
  
    @ApiProperty({
      type: String,
      description: "foydalanuvchi paroli minimal 6 ta belgi",
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;
  }
  