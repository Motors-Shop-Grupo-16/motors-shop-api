import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { Request } from 'express';

import { AddressesService } from './addresses.service';

import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  findOne(@Req() req: Request) {
    return this.addressesService.findOne(req.params.id, req.user.id);
  }

  @Patch()
  update(@Req() req: Request, @Body() body: UpdateAddressDto) {
    return this.addressesService.update(req.params.id, req.user.id, body);
  }
}
