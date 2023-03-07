import { ApiProperty } from '@nestjs/swagger';

export class CreateComment {
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur dipiscing elit.',
  })
  content: string;
}

export class CreateCommentResponse extends CreateComment {
  @ApiProperty({ example: '808c1460-e8f3-470b-81d4-ef5c409595e0' })
  id: string;

  @ApiProperty({ example: '2023-03-01T23:51:00.587Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-03-01T23:51:00.587Z' })
  updatedAt: Date;
}
