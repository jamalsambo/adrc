/* eslint-disable prettier/prettier */
import { EmployeeEntity } from 'src/employees/entities/employee.entity';
import { WatermeterEntity } from 'src/watermeters/entities/watermeter.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { InspectionEntity } from './inspection.entity';

@Entity('inspections_has_watermeters')
export class InspectionHasWatermeter {
  @PrimaryColumn({ name: 'inspection_id', type: 'uuid' })
  inspectionId: string;

  @PrimaryColumn({ name: 'watermeter_id', type: 'uuid' })
  watermeterId: string;

  @PrimaryColumn({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @Column({ name: 'inspection', type: 'boolean', default: false })
  inspection: boolean;

  @ManyToOne(() => WatermeterEntity, (watermeter) => watermeter.hasInspections)
  @JoinColumn({ name: 'watermeter_id' })
  watermeter: WatermeterEntity;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.hasInspections)
  @JoinColumn({ name: 'employee_id' })
  employee: WatermeterEntity;

  @ManyToOne(() => InspectionEntity, (employee) => employee.hasWatermeters)
  @JoinColumn({ name: 'inspection_id' })
  insp: InspectionEntity;

}
