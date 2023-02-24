import { ApiProperty } from '@nestjs/swagger';

export class Addresses {
  @ApiProperty()
  id: string;

  @ApiProperty()
  cep: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  road: string;

  @ApiProperty()
  number: string | number;

  @ApiProperty()
  complement?: string;
}
