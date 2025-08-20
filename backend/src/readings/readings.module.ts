/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { ReadingsController } from './readings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingEntity } from './entities/reading.entity';
import { TypeReadingsEntity } from './entities/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReadingEntity, TypeReadingsEntity])],
  controllers: [ReadingsController],
  providers: [ReadingsService],
  exports: [ReadingsService],
})
export class ReadingsModule {}
