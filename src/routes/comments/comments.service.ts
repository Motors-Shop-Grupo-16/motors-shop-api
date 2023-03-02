/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCommentsDTO } from "./dto/create-comments.dto";
import { UpdateCommentsDTO } from "./dto/update-comments.dto";



@Injectable()
export class CommentsService {
  constructor(
    private prisma: PrismaService,
  ) {} 
   
  async create(body: CreateCommentsDTO) {
    const { author, comment, ...data } = body;

    const createdAuthor = await this.prisma.comments.create({
      data: author,
    });

    const commentsCreated = await this.prisma.comments.create({
      data: { ...data, commentsId: createdAuthor.id },
    } as any);

    const comments = await this.prisma.comments.findUnique({
      where: {
        id: commentsCreated.id,
      },
      include: {
        
      },
    });

    return { ...comments, commentsId: undefined };
  } 

  async findOne(id: string) {
    const comments = await this.prisma.comments.findUnique({
      where: {
        id,
      },
      include: {
        
      },
    });

    if (!comments) {
      throw new NotFoundException('Comments not found!');
    }

    return { ...comments };
  }

  async update(
    id: string,
    {
      author,
      comment,
    }: UpdateCommentsDTO,
  ) {
    if (author) {
      throw new BadRequestException(
        'The author of the comment does not exist',
      );
    }

    const comments = await this.findOne(id);

    const data = {
      author: author ? author : comments.author,
      comment: comment ? comment : comments.comment,
    };

    const updatedComments = await this.prisma.comments.update({
      data,
      where: {
        id,
      },
      include: {
        
      },
    });

    return { ...updatedComments};
  }


  async remove(id: string) {
    await this.findOne(id);

    const data = { isActive: false };

    await this.prisma.comments.update({
      data,
      where: { id },
    });

    return true;
  }


}