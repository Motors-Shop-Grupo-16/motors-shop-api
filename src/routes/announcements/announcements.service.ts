import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAnnouncementDTO } from './dto/create-announcement.dto';
import { UpdateAnnouncementDTO } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementService {
  constructor(private prisma: PrismaService) {}

  async create(createAnnouncementDTO: CreateAnnouncementDTO, userId: string) {
    const { images, ...data } = createAnnouncementDTO;

    const userExists = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User does not exists!');
    }

    const createdAnnouncement = await this.prisma.announcement.create({
      data: { ...data, userId: userId },
    });

    images.forEach(async (image) => {
      await this.prisma.image.create({
        data: { url: image.url, announcementId: createdAnnouncement.id },
      });
    });

    const announcement = await this.prisma.announcement.findUnique({
      where: { id: createdAnnouncement.id },
      include: {
        images: { select: { id: true, url: true } },
        User: { select: { id: true, name: true, description: true } },
      },
    });

    return { ...announcement, userId: undefined };
  }

  async findAll() {
    const announcements = await this.prisma.announcement.findMany({
      where: { isActive: true },
      include: {
        images: { select: { url: true } },
        User: { select: { id: true, name: true, description: true } },
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
        images: { select: { id: true, url: true } },
        User: {
          select: { id: true, name: true, description: true, phone: true },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            User: { select: { id: true, name: true, phone: true } },
          },
        },
      },
    });

    if (!announcementExists) {
      throw new NotFoundException('Announcement does not exists!');
    }

    return { ...announcementExists, userId: undefined };
  }

  async findAllAdvertiser(userId: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User does not exists!');
    }

    return await this.prisma.announcement.findMany({
      where: { userId },
      include: {
        images: { select: { url: true } },
        User: { select: { id: true, name: true, description: true } },
      },
    });
  }

  async update(
    id: string,
    updateAnnouncementDTO: UpdateAnnouncementDTO,
    userId: string,
  ) {
    const { images, ...data } = updateAnnouncementDTO;

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

    if (images) {
      await this.prisma.image.deleteMany({
        where: { announcementId: announcementExists.id },
      });

      images.forEach(async (image) => {
        await this.prisma.image.create({
          data: { url: image.url, announcementId: announcementExists.id },
        });
      });
    }

    const announcement = await this.prisma.announcement.update({
      data,
      where: {
        id,
      },
      include: {
        images: { select: { url: true } },
        User: { select: { id: true, name: true, description: true } },
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
