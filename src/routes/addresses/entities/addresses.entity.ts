import { ApiProperty } from '@nestjs/swagger';

export class Addresses {
  @ApiProperty({ example: '000000-000' })
  cep: string;

  @ApiProperty({ example: 'São Paulo' })
  state: string;

  @ApiProperty({ example: 'São Paulo' })
  city: string;

  @ApiProperty({ example: 'Road one' })
  road: string;

  @ApiProperty({ example: '1234' })
  number: string;

  @ApiProperty({ example: 'House' })
  complement: string;
}

export class AddressesResponse extends Addresses {
  @ApiProperty({ example: '808c1460-e8f3-470b-81d4-ef5c409595e0' })
  id: string;
}
