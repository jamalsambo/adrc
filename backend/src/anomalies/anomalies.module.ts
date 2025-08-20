/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AnomaliesService } from './anomalies.service';
import { AnomaliesController } from './anomalies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnomalyEntity } from './entities/anomaly.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnomalyEntity])],
  controllers: [AnomaliesController],
  providers: [AnomaliesService],
  exports: [AnomaliesService],
})
export class AnomaliesModule {}
