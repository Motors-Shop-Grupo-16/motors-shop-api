/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";


export class CreateCommentDTO{
  @IsString()
  @IsNotEmpty()
  content: string; 
}