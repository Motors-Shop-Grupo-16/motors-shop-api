import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Req,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get()
  findOne(@Req() req: Request) {
    return this.usersService.findOne(req.user.id);
  }

  @Patch()
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Delete()
  @HttpCode(204)
  remove(@Req() req: Request) {
    this.usersService.remove(req.user.id);
  }
}
