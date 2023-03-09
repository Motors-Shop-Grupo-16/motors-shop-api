import { ApiProperty } from '@nestjs/swagger';

export class Login {
  @ApiProperty({ example: 'email@mail.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  password: string;
}

export class LoginResponse {
  @ApiProperty({
    example:
      'exampleGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkdmVydGlzZXIiOnRydWUsImlhdCI6MTY3NzQ1MjYzMCwiZXhwIjoxNjc4MDU3NDMwLCJzdWIiOiI3M2Q1NjU1OS00NjEzLTQ4Y2YtOWNmMS1lYTBkZGQ4Y2UzOTYifQ.i-zlEdg9no4Ocg0L-Dfw3b8GDGBh7-eApKW4794EEBg',
  })
  token: string;
}
