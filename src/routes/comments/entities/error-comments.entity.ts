/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CommentsError400 {
  @ApiProperty({ example: 400 })
  statusCode: string;  

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}
