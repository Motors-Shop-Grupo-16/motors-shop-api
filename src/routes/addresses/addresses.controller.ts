import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { Request } from 'express';

import { AddressesService } from './addresses.service';

import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Addresses, AddressesResponse } from './entities/addresses.entity';

@ApiTags('addresses')
@ApiBearerAuth()
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  @ApiOperation({ summary: 'List address' })
  findOne(@Req() req: Request): Promise<AddressesResponse> {
    return this.addressesService.findOne(req.params.id, req.user.id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update address' })
  @ApiBody({ type: Addresses })
  update(
    @Req() req: Request,
    @Body() body: UpdateAddressDto,
  ): Promise<AddressesResponse> {
    return this.addressesService.update(req.params.id, req.user.id, body);
  }
}
