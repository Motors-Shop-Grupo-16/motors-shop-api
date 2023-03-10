import { ApiProperty } from '@nestjs/swagger';

export class SendEmail {
  @ApiProperty({ example: 'email@mail.com' })
  email: string;
}

export class SendEmailResponse {
  @ApiProperty({
    example:
      'An email has been sent with instructions for resetting your password.',
  })
  message: string;
}

export class RecoverPasswordEmail {
  @ApiProperty({ example: '123456' })
  password: string;
}

export class RecoverPasswordEmailResponse {
  @ApiProperty({
    example: 'Successfully recovered password',
  })
  message: string;
}
