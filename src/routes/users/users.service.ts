import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    const { address, confirmPassword, ...data } = body;

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

    if (data.password !== confirmPassword) {
      throw new BadRequestException(
        'Password confirmation is different from password',
      );
    }

    const createdAddress = await this.prisma.address.create({
      data: address,
    });

    data.password = hashSync(data.password, 10);

    data.dateOfBirth = new Date(data.dateOfBirth);

    const userCreated = await this.prisma.user.create({
      data: { ...data, addressId: createdAddress.id },
    } as any);

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

    if (!user) {
      throw new NotFoundException('User does not exists!');
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

    if (!user) {
      throw new NotFoundException('User does not exists!');
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
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
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

    let token = jwt.sign({}, process.env.SECRET_KEY, {
      expiresIn: '30m',
    });

    if (!tokenExists) {
      await this.prisma.recoverPassword.create({
        data: { token, userId: userExists.id },
      });
    } else {
      token = tokenExists.token;
    }

    const mail = {
      to: userExists.email,
      from: 'contato@motorsshop.com',
      subject: 'Email de recuperação',
      template: 'recover-password',
      context: {
        baseURL: process.env.BASE_URL,
        token: token,
      },
    };

    try {
      await this.mailerService.sendMail(mail);
    } catch {
      throw new BadRequestException('Error sending email');
    }

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

    let deleteToken = false;

    jwt.verify(token, process.env.SECRET_KEY, (err: any, decoded: any) => {
      if (err || !decoded) {
        deleteToken = true;
      }
    });

    if (deleteToken) {
      await this.prisma.recoverPassword.delete({
        where: { token },
      });
      throw new UnauthorizedException('Expired token, send another email');
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
