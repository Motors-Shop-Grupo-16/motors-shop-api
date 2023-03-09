import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AnnouncementController } from './announcements.controller';
import { AnnouncementService } from './announcements.service';

@Module({
  controllers: [AnnouncementController],
  providers: [AnnouncementService, PrismaService],
})
export class AnnouncementModule {}
