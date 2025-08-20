/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { EmployeeHasZoneEntity } from './entities/has-zones.entity';
import { PositionEntity } from './entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity, EmployeeHasZoneEntity, PositionEntity])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
