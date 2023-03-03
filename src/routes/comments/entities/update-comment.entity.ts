/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateComment, CreateCommentResponse } from './create-comment.entity';

export class UpdateComment extends PartialType(CreateComment) {}

export class UpdateCommentResponse extends CreateCommentResponse {}
