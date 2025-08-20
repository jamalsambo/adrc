/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { InspectionsController } from './inspections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionEntity } from './entities/inspection.entity';
import { InspectionHasWatermeter } from './entities/has-watermeter.entity';
import { InspectionTypesEntity } from './entities/type.entity';
@Module({
  imports: [TypeOrmModule.forFeature([InspectionEntity, InspectionHasWatermeter, InspectionTypesEntity])],
  controllers: [InspectionsController],
  providers: [InspectionsService],
  exports: [InspectionsService],
})
export class InspectionsModule {}
