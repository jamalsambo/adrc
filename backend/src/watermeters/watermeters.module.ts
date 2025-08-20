/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WatermetersService } from './watermeters.service';
import { WatermetersController } from './watermeters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatermeterEntity } from './entities/watermeter.entity';
import { EmployeeHasZoneEntity } from 'src/employees/entities/has-zones.entity';
import { InspectionHasWatermeter } from 'src/inspections/entities/has-watermeter.entity';


@Module({
  imports: [TypeOrmModule.forFeature([WatermeterEntity, EmployeeHasZoneEntity, InspectionHasWatermeter])
],
  controllers: [WatermetersController],
  providers: [WatermetersService],
  exports: [WatermetersService],
})
export class WatermetersModule {}
