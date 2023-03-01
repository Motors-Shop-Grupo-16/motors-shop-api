import { ApiProperty } from '@nestjs/swagger';

import { Addresses } from '../../addresses/entities/addresses.entity';

export class CreateUser {
  @ApiProperty({ example: 'email@mail.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  password: string;

  @ApiProperty({ example: '123456' })
  confirmPassword?: string;

  @ApiProperty({ example: 'Pedro Rafael' })
  name: string;

  @ApiProperty({ example: '00000000000' })
  cpf: string;

  @ApiProperty({ example: '(00) 99999-9999' })
  phone: string;

  @ApiProperty({ example: '2000-02-23' })
  dateOfBirth: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  })
  description: string;

  @ApiProperty()
  isAdvertiser?: boolean;

  @ApiProperty({ type: () => Addresses })
  Address: Addresses;
}

export class CreateUserResponse extends CreateUser {
  @ApiProperty({ example: '008c1460-e8f3-470b-81d4-ef5c409595e0' })
  id: string;

  @ApiProperty({ example: '2023-02-26T23:04:00.498Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-02-26T23:04:00.498Z' })
  updatedAt: Date;
}
