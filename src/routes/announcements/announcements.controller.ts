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
import { Request } from 'express';
import { AnnouncementService } from './announcements.service';
import { CreateAnnouncementDTO } from './dto/create-announcement.dto';
import { UpdateAnnouncementDTO } from './dto/update-announcement.dto';
import {
  CreateAnnouncement,
  CreateAnnouncementResponse,
  FindOneAnnouncementResponse,
} from './entities/create-announcement.entity';
import {
  AnnouncementError400,
  AnnouncementError401,
  AnnouncementError404,
} from './entities/error-announcement.entity';
import {
  UpdateAnnouncement,
  UpdateAnnouncementResponse,
} from './entities/update-announcement.entity';

@ApiTags('announcements')
@Controller('announcements')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create announcement' })
  @ApiBody({ type: CreateAnnouncement })
  @ApiResponse({
    status: 401,
    type: AnnouncementError401,
  })
  @ApiResponse({
    status: 400,
    type: AnnouncementError400,
  })
  async create(
    @Req() req: Request,
    @Body() createAnnouncementDTO: CreateAnnouncementDTO,
  ): Promise<CreateAnnouncementResponse> {
    return await this.announcementService.create(
      createAnnouncementDTO,
      req.user.id,
    );
  }

  @Get()
  @ApiOperation({ summary: 'List all announcements' })
  async findAll(): Promise<CreateAnnouncementResponse[]> {
    return await this.announcementService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'List one announcement' })
  @ApiResponse({
    status: 404,
    type: AnnouncementError404,
  })
  async findOne(@Param('id') id: string): Promise<FindOneAnnouncementResponse> {
    return await this.announcementService.findOne(id);
  }

  @Get('/advertiser/:id')
  @ApiOperation({ summary: 'List all announcement advertiser' })
  @ApiResponse({
    status: 404,
    type: AnnouncementError404,
  })
  async findAllSeller(
    @Param('id') id: string,
  ): Promise<CreateAnnouncementResponse[]> {
    return await this.announcementService.findAllAdvertiser(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update announcement' })
  @ApiBody({ type: UpdateAnnouncement })
  @ApiResponse({
    status: 400,
    type: AnnouncementError400,
  })
  @ApiResponse({
    status: 401,
    type: AnnouncementError401,
  })
  @ApiResponse({
    status: 404,
    type: AnnouncementError404,
  })
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateAnnouncementDTO: UpdateAnnouncementDTO,
  ): Promise<UpdateAnnouncementResponse> {
    return await this.announcementService.update(
      id,
      updateAnnouncementDTO,
      req.user.id,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete announcement' })
  @ApiResponse({
    status: 401,
    type: AnnouncementError401,
  })
  @ApiResponse({
    status: 404,
    type: AnnouncementError404,
  })
  @HttpCode(204)
  async delete(@Req() req: Request, @Param('id') id: string) {
    return await this.announcementService.delete(id, req.user.id);
  }
}
