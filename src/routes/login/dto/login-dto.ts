import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
