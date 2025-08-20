/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('provinces')
  findProvince() {
    return this.locationsService.findProvince();
  }

  @Get('districts')
  findDistrict() {
    return this.locationsService.findDistrict();
  }

  @Get('zones')
  findZone() {
    return this.locationsService.findZone();
  }
}
