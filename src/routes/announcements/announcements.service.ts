import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { IAnnouncement, IImage } from './interfaces/announcements.interface';

@Injectable()
export class AnnouncementService {
  constructor(private prisma: PrismaService) {}

  async create(data: IAnnouncement, images: IImage[]) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User does not exists!');
    }

    const announcement = await this.prisma.announcement.create({
      data,
    });

    images.forEach(async (image) => {
      await this.prisma.image.create({
        data: { url: image.url, announcementId: announcement.id },
      });
    });

    return { ...announcement, userId: undefined };
  }

  async findAll() {
    const announcements = await this.prisma.announcement.findMany({
      where: { isActive: true, typeSale: 'sale' },
      include: {
        images: { select: { url: true } },
        User: { select: { name: true } },
      },
    });

    return announcements.map((announcement) => {
      return { ...announcement, userId: undefined };
    });
  }

  async findOne(id: string) {
    const announcementExists = await this.prisma.announcement.findUnique({
      where: {
        id,
      },
      include: {
        images: { select: { url: true } },
        User: { select: { name: true } },
      },
    });

    if (!announcementExists) {
      throw new NotFoundException('Announcement does not exists!');
    }

    return { ...announcementExists, userId: undefined };
  }

  async findAllAdvertiser(userId: string) {
    return this.prisma.announcement.findMany({
      where: { typeSale: 'sale', userId },
      include: {
        images: { select: { url: true } },
      },
    });
  }

  async update(id: string, data: IAnnouncement, images: IImage[], userId) {
    const announcementExists = await this.prisma.announcement.findUnique({
      where: {
        id,
      },
    });

    if (!announcementExists) {
      throw new NotFoundException('Announcement does not exists!');
    }

    if (announcementExists.userId !== userId) {
      throw new UnauthorizedException('User dont have permission');
    }

    await this.prisma.image.deleteMany({
      where: { announcementId: announcementExists.id },
    });

    images.forEach(async (image) => {
      await this.prisma.image.create({
        data: { url: image.url, announcementId: announcementExists.id },
      });
    });

    const announcement = await this.prisma.announcement.update({
      data,
      where: {
        id,
      },
    });

    return { ...announcement, userId: undefined };
  }

  async delete(id: string, userId) {
    const announcementExists = await this.prisma.announcement.findUnique({
      where: {
        id,
      },
    });

    if (!announcementExists) {
      throw new NotFoundException('Announcement does not exists!');
    }

    if (announcementExists.userId !== userId) {
      throw new UnauthorizedException('User dont have permission');
    }

    await this.prisma.announcement.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
