/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class CreateComments {
  @ApiProperty({ example: 'João Carlos'})
  author: string;

  @ApiProperty({ example: 'Lorem ipsum dolor sit amet, consectetur dipiscing elit.'})
  comment: string;
}


export class CreateCommentsResponse extends CreateComments{
  @ApiProperty({ example: '808c1460-e8f3-470b-81d4-ef5c409595e0' })
  id: string;

  @ApiProperty({ example: '2023-03-01T23:51:00.587Z' })
  createdAt: Date;
}