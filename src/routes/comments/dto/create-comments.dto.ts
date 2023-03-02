/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";


export class CreateCommentsDTO{
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  comment: string; 
}