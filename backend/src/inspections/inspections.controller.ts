/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { CreateInspectionDto } from './dto/create-inspection.dto';

@Controller('inspections')
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}

  @Post()
  create(@Body() createInspectionDto: CreateInspectionDto) {
    return this.inspectionsService.create(createInspectionDto);
  }

  @Get()
  findAll() {
    return this.inspectionsService.findAll();
  }

  @Get('types')
  findTypes() {
    return this.inspectionsService.findTypes();
  }

  @Get(':id/watermeters')
  findWatermeter(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.inspectionsService.findWatermeter(id);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.inspectionsService.findOneOrFail({ id });
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.inspectionsService.remove(id);
  }
}
