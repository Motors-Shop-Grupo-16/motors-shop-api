import { ApiProperty } from '@nestjs/swagger';

export class LoginError400 {
  @ApiProperty({ example: 400 })
  statusCode: string;

  @ApiProperty({
    example: ['Invalid e-mail or password!'],
  })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}
