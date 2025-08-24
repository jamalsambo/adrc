/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Query } from '@nestjs/common';
import { WatermetersService } from './watermeters.service';
import { CreateWatermeterDto } from './dto/create-watermeter.dto';
import { UpdateWatermeterDto } from './dto/update-watermeter.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

@Controller('watermeters')
export class WatermetersController {
  constructor(private readonly watermetersService: WatermetersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWatermeterDto: CreateWatermeterDto) {
    return this.watermetersService.create(createWatermeterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('limit')  limit: number
  ) {
    return this.watermetersService.findAll(limit);
  }

  @Post('distribute/:inspectionId')
  distribute(@Param('inspectionId', new ParseUUIDPipe()) inspectionId: string) {
    return this.watermetersService.distributeWatermetersToEmployees(inspectionId)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.watermetersService.findOneOrFail({id});
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id',  new ParseUUIDPipe()) id: string, @Body() updateWatermeterDto: UpdateWatermeterDto) {
    return this.watermetersService.update(id, updateWatermeterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.watermetersService.remove(id);
  }


}
