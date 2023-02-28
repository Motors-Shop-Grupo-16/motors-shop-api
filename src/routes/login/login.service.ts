import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDTO } from './dto/login-dto';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async login({ email, password }: LoginDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !user.isActive) {
      throw new BadRequestException('Invalid e-mail or password!');
    }

    const passwordMatches = await bcryptjs.compare(password, user.password);

    if (!passwordMatches) {
      throw new BadRequestException('Invalid e-mail or password!');
    }

    const token = jwt.sign(
      {
        isAdvertiser: user.isAdvertiser,
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: '7d',
        subject: user.id,
      },
    );

    return token;
  }
}
