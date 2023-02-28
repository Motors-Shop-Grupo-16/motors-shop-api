import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { randomBytes } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

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

  async create(body: CreateUserDto) {
    const { address, ...data } = body;

    const createdAddress = await this.prisma.address.create({
      data: address,
    });

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

    const userCreated = await this.prisma.user.create({
      data: { ...data, addressId: createdAddress.id },
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id: userCreated.id,
      },
      include: {
        Address: true,
      },
    });

    return { ...user, password: undefined, addressId: undefined };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        Address: true,
      },
    });

    if (!user || !user.isActive) {
      throw new NotFoundException('User not found!');
    }

    return { ...user, password: undefined, addressId: undefined };
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        Address: true,
      },
    });

    if (!user || !user.isActive) {
      throw new NotFoundException('User not found!');
    }

    return { ...user, password: undefined, addressId: undefined };
  }

  async update(
    id: string,
    {
      cpf,
      dateOfBirth,
      description,
      email,
      name,
      password,
      phone,
    }: UpdateUserDto,
  ) {
    if (password) {
      throw new BadRequestException(
        'The password field is not able to update in this route',
      );
    }

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
      description: description ? description : user.description,
      email: email ? email : user.email,
      name: name ? name : user.name,
      phone: phone ? phone : user.phone,
    };

    const updatedUser = await this.prisma.user.update({
      data,
      where: {
        id,
      },
      include: {
        Address: true,
      },
    });

    return { ...updatedUser, password: undefined, addressId: undefined };
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

  async sendEmailRecoverPassword(email: string) {
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      throw new NotFoundException('Email not found');
    }

    const tokenExists = await this.prisma.recoverPassword.findUnique({
      where: { userId: userExists.id },
    });

    let token = randomBytes(32).toString('hex');
    if (!tokenExists) {
      await this.prisma.recoverPassword.create({
        data: { token, userId: userExists.id },
      });
    } else {
      token = tokenExists.token;
    }

    const mail = {
      to: userExists.email,
      from: 'nobot@motorsshop.com',
      subject: 'Email de recuperação',
      template: 'recover-password',
      context: {
        token: token,
      },
    };

    await this.mailerService.sendMail(mail);

    return {
      message:
        'An email has been sent with instructions for resetting your password.',
    };
  }

  async recoverPassword(token: string, newPassword: string) {
    const tokenExists = await this.prisma.recoverPassword.findUnique({
      where: { token },
      select: {
        userId: true,
      },
    });

    if (!tokenExists) {
      throw new NotFoundException('Invalid token');
    }

    const password = hashSync(newPassword, 10);

    await this.prisma.user.update({
      where: { id: tokenExists.userId },
      data: {
        password: password,
      },
    });

    await this.prisma.recoverPassword.delete({
      where: { token },
    });

    return {
      message: 'Successfully recovered password',
    };
  }
}
