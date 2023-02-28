import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async update(
    id: string,
    { cep, city, number, road, state, complement }: UpdateAddressDto,
  ) {
    const address = await this.prisma.address.findFirst({
      where: {
        User: { id },
      },
      include: {
        User: { select: { id: true } },
      },
    });

    const data = {
      cep: cep ? cep : address.cep,
      city: city ? city : address.city,
      number: number ? number : address.number,
      road: road ? road : address.road,
      state: state ? state : address.state,
      complement: complement ? complement : address.complement,
    };

    const updatedAddress = await this.prisma.address.update({
      data,
      where: {
        id: address.id,
      },
      include: { User: { select: { id: true } } },
    });

    return updatedAddress;
  }
}
