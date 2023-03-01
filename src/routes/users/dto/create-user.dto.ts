import { Type } from 'class-transformer';

import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CreateAdressDto } from '../../addresses/dto/create-address.dto';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  isAdvertiser?: boolean;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAdressDto)
  address: CreateAdressDto;
}
