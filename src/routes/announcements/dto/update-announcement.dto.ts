import { PartialType } from '@nestjs/swagger';
import { CreateAnnouncementDTO } from './create-announcement.dto';

export class UpdateAnnouncementDTO extends PartialType(CreateAnnouncementDTO) {}
