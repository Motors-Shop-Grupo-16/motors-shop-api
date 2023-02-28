import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnouncementDTO } from './create-announcement.dto';

export class UpdateAnnouncementDTO extends PartialType(CreateAnnouncementDTO) {}
