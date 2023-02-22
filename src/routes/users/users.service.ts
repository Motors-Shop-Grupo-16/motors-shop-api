import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async checkIfEmailExists(email: string) {
    const emailExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      throw new BadRequestException('E-mail already registered!');
    }
  }

  async checkIfCpfExists(cpf: string) {
    const cpfExists = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    });

    if (cpfExists) {
      throw new BadRequestException('CPF already registered!');
    }
  }

  async create(data: CreateUserDto) {
    const emailExists = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailExists) {
      throw new BadRequestException('E-mail already registered!');
    }

    const cpfExists = await this.prisma.user.findUnique({
      where: {
        cpf: data.cpf,
      },
    });

    if (cpfExists) {
      throw new BadRequestException('CPF already registered!');
    }

    data.password = hashSync(data.password, 10);

    data.dateOfBirth = new Date(data.dateOfBirth);

    const user = await this.prisma.user.create({
      data,
    });

    return { ...user, password: undefined };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      return { ...user, password: undefined };
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user || !user.isActive) {
      throw new NotFoundException('User not found!');
    }

    return { ...user, password: undefined };
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !user.isActive) {
      throw new NotFoundException('User not found!');
    }

    return { ...user, password: undefined };
  }

  async update(
    id: string,
    { cpf, dateOfBirth, email, name, password, phone }: UpdateUserDto,
  ) {
    const user = await this.findOne(id);

    if (email && email != user.email) {
      const emailExists = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (emailExists) {
        throw new BadRequestException('E-mail already registered!');
      }
    }

    if (cpf && cpf != user.cpf) {
      const cpfExists = await this.prisma.user.findUnique({
        where: {
          cpf,
        },
      });

      if (cpfExists) {
        throw new BadRequestException('CPF already registered!');
      }
    }

    const data = {
      cpf: cpf ? cpf : user.cpf,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : user.dateOfBirth,
      email: email ? email : user.email,
      name: name ? name : user.name,
      password: password ? hashSync(password) : user.password,
      phone: phone ? phone : user.phone,
    };

    const updatedUser = await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });

    return { ...updatedUser, password: undefined };
  }

  async remove(id: string) {
    await this.findOne(id);

    const data = { isActive: false };

    await this.prisma.user.update({
      data,
      where: { id },
    });

    return true;
  }
}
