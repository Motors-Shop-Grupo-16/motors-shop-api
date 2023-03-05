import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  controllers: [CommentController],
  providers: [CommentsService, PrismaService],
})
export class CommentsModule {}
