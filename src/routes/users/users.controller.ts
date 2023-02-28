import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUser, CreateUserResponse } from './entities/create-user.entity';
import { UserError400 } from './entities/error-user.entity';
import { UpdateUser, UpdateUserResponse } from './entities/update-user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUser })
  @ApiResponse({ status: 400, type: UserError400 })
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List user' })
  findOne(@Req() req: Request): Promise<CreateUserResponse> {
    return this.usersService.findOne(req.user.id);
  }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({ type: UpdateUser })
  @ApiResponse({ status: 400, type: UserError400 })
  update(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  @HttpCode(204)
  remove(@Req() req: Request) {
    return this.usersService.remove(req.user.id);
  }
}
