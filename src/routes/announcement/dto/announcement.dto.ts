import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import {
  ArrayNotEmpty,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class AnnouncementDTO {
  public id: string;
  public userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    enum: {
      sale: 'sale',
      auction: 'auction',
    },
  })
  @IsEnum({
    sale: 'sale',
    auction: 'auction',
  })
  public typeSale: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public year: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public mileage: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public price: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @ApiProperty({
    enum: {
      car: 'car',
      motorcycle: 'motorcycle',
    },
  })
  @IsEnum({
    car: 'car',
    motorcycle: 'motorcycle',
  })
  public typeVehicle: string;

  @ApiProperty()
  @IsUrl()
  public coverImage: string;

  @ApiProperty({ isArray: true, example: [{ url: 'https://image.jpg' }] })
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => ImageDTO)
  public images: ImageDTO[];

  @ApiProperty()
  @IsBoolean()
  public isActive: boolean;
}

export class ImageDTO {
  public id: string;
  @IsUrl()
  public url: string;
}
