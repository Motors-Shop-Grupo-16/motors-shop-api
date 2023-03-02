/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Patch, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommentsService } from "./comments.service";
import { CreateCommentsDTO } from "./dto/create-comments.dto";
import { UpdateCommentsDTO } from "./dto/update-comments.dto";
import { CreateComments, CreateCommentsResponse } from "./entities/create-comments.entity";
import { CommentsError400 } from "./entities/error-comments.entity";
import { UpdateComments, UpdateCommentsResponse } from "./entities/update-comments.entity";


@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentsService: CommentsService){}

  @Post()
  @ApiOperation({ summary: 'Create Comment'})
  @ApiBody({ type: CreateComments})
  @ApiResponse({ status: 400, type: CommentsError400})
  create(@Body() CreateCommentsDTO: CreateCommentsDTO):Promise<CreateCommentsResponse>{
    return this.commentsService.create(CreateCommentsDTO);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List comment' })
  findOne(@Req() req: Request): Promise<CreateCommentsResponse> {
    return this.commentsService.findOne(req.comments.id);
  }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update comment' })
  @ApiBody({ type: UpdateComments })
  @ApiResponse({ status: 400, type: CommentsError400 })
  update(
    @Req() req: Request,
    @Body() UpdateCommentsDTO: UpdateCommentsDTO,
  ): Promise<UpdateCommentsResponse> {
    return this.commentsService.update(req.comments.id, UpdateCommentsDTO);
  }

  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete comment' })
  @HttpCode(204)
  remove(@Req() req: Request) {
    return this.commentsService.remove(req.comments.id);
  }
}