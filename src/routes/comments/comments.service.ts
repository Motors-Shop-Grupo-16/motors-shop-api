import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateCommentDTO, announcementId: string, userId: string) {
    const { ...data } = body;

    const userExists = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExists) {
      throw new NotFoundException('User does not exists!');
    }

    const announcementExists = await this.prisma.announcement.findUnique({
      where: {
        id: announcementId,
      },
    });
    if (!announcementExists) {
      throw new NotFoundException('Announcement does not exists!');
    }

    const comment = await this.prisma.comment.create({
      data: { ...data, announcementId: announcementId, userId: userId },
    });

    return { ...comment };
  }

  async update(body: UpdateCommentDTO, commentId: string, userId: string) {
    const { ...data } = body;
    const commentExists = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!commentExists) {
      throw new NotFoundException('Comment does not exists!');
    }

    if (commentExists.userId !== userId) {
      throw new BadRequestException('Comment does not belong to the user');
    }

    const updatedComments = await this.prisma.comment.update({
      data,
      where: {
        id: commentId,
      },
    });

    return { ...updatedComments };
  }

  async remove(commentId: string, userId: string) {
    const commentExists = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!commentExists) {
      throw new NotFoundException('Comment does not exists!');
    }

    if (commentExists.userId !== userId) {
      throw new BadRequestException('Comment does not belong to the user');
    }
    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return true;
  }
}
