/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { CreateInspectionDto } from './dto/create-inspection.dto';

@Controller('inspections')
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) { }

  @Post()
  create(@Body() createInspectionDto: CreateInspectionDto) {
    return this.inspectionsService.create(createInspectionDto);
  }

  @Get()
  findAll(
    @Query('employeeId') employeeId?: string,
    @Query('limit') limit?: number,
  ) {
    return this.inspectionsService.findAll(employeeId, limit);
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
  findOne(@Param('id', new ParseUUIDPipe()) id: string,
    @Query('employeeId') employeeId?: string,
  ) {
    return this.inspectionsService.findOneOrFail({ id }, employeeId);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.inspectionsService.remove(id);
  }
}
