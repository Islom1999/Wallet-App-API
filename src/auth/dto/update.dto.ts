import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class updateFullNameDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;
}


export class updatePasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;
  }
  