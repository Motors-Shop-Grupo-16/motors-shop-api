import { Type } from 'class-transformer';

import {
  ArrayNotEmpty,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class CreateAnnouncementDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsEnum({
    sale: 'sale',
    auction: 'auction',
  })
  readonly typeSale: string;

  @IsString()
  @IsNotEmpty()
  readonly year: string;

  @IsString()
  @IsNotEmpty()
  readonly mileage: string;

  @IsString()
  @IsNotEmpty()
  readonly price: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsEnum({
    car: 'car',
    motorcycle: 'motorcycle',
  })
  readonly typeVehicle: string;

  @IsUrl()
  readonly coverImage: string;

  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => ImageDTO)
  readonly images: ImageDTO[];

  @IsOptional()
  @IsBoolean()
  readonly isActive: boolean;
}

export class ImageDTO {
  @IsUrl()
  readonly url: string;
}
