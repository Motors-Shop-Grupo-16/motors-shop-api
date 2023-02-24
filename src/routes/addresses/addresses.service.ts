import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string, userId: string) {
    const address = await this.prisma.address.findUnique({
      where: {
        id,
      },
      include: {
        User: { select: { id: true } },
      },
    });

    if (address.User.id !== userId) {
      throw new UnauthorizedException('Logged user is not owner of address!');
    }

    if (!address) {
      throw new NotFoundException('Address not found!');
    }

    return address;
  }

  async update(
    id: string,
    userId: string,
    { cep, city, number, road, state, complement }: UpdateAddressDto,
  ) {
    const address = await this.prisma.address.findUnique({
      where: {
        id,
      },
      include: {
        User: { select: { id: true } },
      },
    });

    if (address.User.id !== userId) {
      throw new UnauthorizedException('Logged user is not owner of address!');
    }

    if (!address) {
      throw new NotFoundException('Address not found!');
    }

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
        id,
      },
    });

    return updatedAddress;
  }
}
