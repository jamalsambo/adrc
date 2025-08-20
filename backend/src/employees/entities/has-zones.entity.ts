/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('employee_has_zones')
export class EmployeeHasZoneEntity {
  @PrimaryColumn({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @PrimaryColumn({ name: 'zone_id', type: 'uuid' })
  zoneId: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Column({ name: 'createdBy', type: 'uuid' })
  createdBy: string;
}
