/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateComments, CreateCommentsResponse } from './create-comments.entity';

export class UpdateComments extends PartialType(CreateComments) {}

export class UpdateCommentsResponse extends CreateCommentsResponse {}