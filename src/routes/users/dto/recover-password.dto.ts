import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class RecoverPasswordDTO {
  @IsString()
  @IsNotEmpty()
  password: string;
}
