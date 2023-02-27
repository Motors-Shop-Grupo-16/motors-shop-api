import { ApiProperty } from '@nestjs/swagger';

export class CreateAnnouncement {
  @ApiProperty({ example: 'Pedro Rafael' })
  title: string;

  @ApiProperty({ enum: ['sale', 'auction'] })
  typeSale: string;

  @ApiProperty({ example: '2020' })
  year: string;

  @ApiProperty({ example: '10000' })
  mileage: string;

  @ApiProperty({ example: '12300' })
  price: string;

  @ApiProperty({ example: 'Example for description' })
  description: string;

  @ApiProperty({ enum: ['car', 'motorcycle'] })
  typeVehicle: string;

  @ApiProperty({ example: 'www.image.jpg' })
  coverImage: string;

  @ApiProperty({ example: { url: 'www.image.jpg' } })
  images?: Image[];

  @ApiProperty()
  isActive: boolean;
}

export class Image {
  @ApiProperty()
  url: string;
}

export class CreateAnnouncementResponse extends CreateAnnouncement {
  @ApiProperty({ example: '808c1460-e8f3-470b-81d4-ef5c409595e0' })
  id: string;

  @ApiProperty({ example: '2023-02-26T23:04:00.498Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-02-26T23:04:00.498Z' })
  updatedAt: Date;
}