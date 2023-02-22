import { IsDateString, IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email?: string;
  @IsString()
  password?: string;
  @IsString()
  name?: string;
  @IsString()
  cpf?: string;
  @IsString()
  phone?: string;
  @IsDateString()
  dateOfBirth?: Date | string;
}
