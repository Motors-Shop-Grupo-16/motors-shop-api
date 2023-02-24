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

import { AnnouncementService } from './announcements.service';
import { AnnouncementDTO } from './dto/announcements.dto';
import { Request } from 'express';

@Controller('announcements')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  async create(@Req() req: Request, @Body() data: AnnouncementDTO) {
    const { images } = data;
    delete data.images;
    data.userId = req.user.id;
    return this.announcementService.create(data, images);
  }

  @Get()
  async findAll() {
    return this.announcementService.findAll();
  }

  @Get('/notAdvertiser/:id')
  async findOne(@Param('id') id: string) {
    return this.announcementService.findOne(id);
  }

  @Get('/advertiser')
  async findAllSeller(@Req() req: Request) {
    return this.announcementService.findAllAdvertiser(req.user.id);
  }

  @Patch('/advertiser/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() data: AnnouncementDTO,
  ) {
    const { images } = data;
    delete data.images;
    return this.announcementService.update(id, data, images, req.user.id);
  }

  @Delete('/advertiser/:id')
  @HttpCode(204)
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.announcementService.delete(id, req.user.id);
  }
}
