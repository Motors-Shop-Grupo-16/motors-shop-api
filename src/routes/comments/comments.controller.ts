import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { CreateComment } from './entities/create-comment.entity';
import {
  CommentError400,
  CommentError404,
} from './entities/error-comment.entity';
import {
  UpdateComment,
  UpdateCommentResponse,
} from './entities/update-comment.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Comment' })
  @ApiBody({ type: CreateComment })
  @ApiResponse({ status: 400, type: CommentError400 })
  @ApiResponse({ status: 404, type: CommentError404 })
  create(
    @Req() req: Request,
    @Param('id') announcementId: string,
    @Body() createCommentDTO: CreateCommentDTO,
  ): Promise<CreateComment> {
    return this.commentsService.create(
      createCommentDTO,
      announcementId,
      req.user.id,
    );
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update comment' })
  @ApiBody({ type: UpdateComment })
  @ApiResponse({ status: 400, type: CommentError400 })
  @ApiResponse({ status: 404, type: CommentError404 })
  update(
    @Req() req: Request,
    @Param('id') commentId: string,
    @Body() UpdateCommentsDTO: UpdateCommentDTO,
  ): Promise<UpdateCommentResponse> {
    return this.commentsService.update(
      UpdateCommentsDTO,
      commentId,
      req.user.id,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({ status: 404, type: CommentError404 })
  @HttpCode(204)
  remove(@Req() req: Request, @Param('id') commentId: string) {
    return this.commentsService.remove(commentId, req.user.id);
  }
}
