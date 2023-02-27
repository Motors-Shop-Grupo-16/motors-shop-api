import { ApiProperty } from '@nestjs/swagger';

export class AnnouncementError400 {
  @ApiProperty({ example: 400 })
  statusCode: string;

  @ApiProperty({
    example: ['typeSale must be one of the following values: sale, auction'],
  })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}

export class AnnouncementError401 {
  @ApiProperty({ example: 401 })
  statusCode: string;

  @ApiProperty({ example: 'Not an advertise' })
  message: string;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;
}

export class AnnouncementError404 {
  @ApiProperty({ example: 404 })
  statusCode: string;

  @ApiProperty({
    example: 'Does not exists',
  })
  message: string;

  @ApiProperty({ example: 'Not found' })
  error: string;
}
