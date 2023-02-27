import { PartialType } from '@nestjs/swagger';
import {
  CreateAnnouncement,
  CreateAnnouncementResponse,
} from './create-announcement.entity';

export class UpdateAnnouncement extends PartialType(CreateAnnouncement) {}

export class UpdateAnnouncementResponse extends CreateAnnouncementResponse {}
