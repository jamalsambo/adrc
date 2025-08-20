/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceEntity } from './entities/province.entity';
import { DistrictEntity } from './entities/distrctit.entity';
import { ZoneEntity } from './entities/zone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProvinceEntity,DistrictEntity, ZoneEntity])],
  controllers: [LocationsController],
  providers: [LocationsService],
  exports: [TypeOrmModule]
})
export class LocationsModule {}
