import { PartialType } from '@nestjs/swagger';
import { CreateUser, CreateUserResponse } from './create-user.entity';

export class UpdateUser extends PartialType(CreateUser) {}

export class UpdateUserResponse extends CreateUserResponse {}
