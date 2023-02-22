import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ILogin } from './interfaces/ILogin';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async login({ email, password }: ILogin) {
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
        userId: user.id,
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
