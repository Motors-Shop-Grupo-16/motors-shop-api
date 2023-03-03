import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
      // include: {
      //   User: { select: { id: true, name: true } },
      // },
    });

    // const commentsCreated = await this.prisma.comment.create({
    //   data: { ...data, commentsId: createdAuthor.id },
    // } as any);

    // const comments = await this.prisma.comment.findUnique({
    //   where: {
    //     id: commentsCreated.id,
    //   },
    //   include: {},
    // });

    return { ...comment, announcementId: undefined, userId: undefined };
  }

  // async findOne(id: string) {
  //   const comments = await this.prisma.comment.findUnique({
  //     where: {
  //       id,
  //     },
  //     include: {

  //     },
  //   });

  //   if (!comments) {
  //     throw new NotFoundException('Comments not found!');
  //   }

  //   return { ...comments };
  // }

  // async update(
  //   id: string,
  //   {
  //     author,
  //     comment,
  //   }: UpdateCommentsDTO,
  // ) {
  //   if (author) {
  //     throw new BadRequestException(
  //       'The author of the comment does not exist',
  //     );
  //   }

  //   const comments = await this.findOne(id);

  //   const data = {
  //     author: author ? author : comments.author,
  //     comment: comment ? comment : comments.comment,
  //   };

  //   const updatedComments = await this.prisma.comment.update({
  //     data,
  //     where: {
  //       id,
  //     },
  //     include: {

  //     },
  //   });

  //   return { ...updatedComments};
  // }

  // async remove(id: string) {
  //   await this.findOne(id);

  //   const data = { isActive: false };

  //   await this.prisma.comment.update({
  //     data,
  //     where: { id },
  //   });

  //   return true;
  // }
}
