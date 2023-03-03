import {
  Body,
  Controller,
  Delete,
  Get,
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
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import {
  CreateComment,
  CreateCommentResponse,
} from './entities/create-comment.entity';
import {
  CommentError400,
  CommentError404,
} from './entities/error-comment.entity';
import {
  UpdateComment,
  UpdateCommentResponse,
} from './entities/update-comment.entity';
import { Request } from 'express';

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

  // @Get()
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'List comment' })
  // findOne(@Req() req: Request): Promise<CreateCommentResponse> {
  //   return this.commentsService.findOne(req.comments.id);
  // }

  // @Patch()
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Update comment' })
  // @ApiBody({ type: UpdateComment })
  // @ApiResponse({ status: 400, type: CommentError400 })
  // update(
  //   @Req() req: Request,
  //   @Body() UpdateCommentsDTO: UpdateCommentDTO,
  // ): Promise<UpdateCommentResponse> {
  //   return this.commentsService.update(req.comments.id, UpdateCommentsDTO);
  // }

  // @Delete()
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Delete comment' })
  // @HttpCode(204)
  // remove(@Req() req: Request) {
  //   return this.commentsService.remove(req.comments.id);
  // }
}
