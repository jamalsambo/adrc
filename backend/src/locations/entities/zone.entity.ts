/* eslint-disable prettier/prettier */
import { EmployeeEntity } from 'src/employees/entities/employee.entity';
import { WatermeterEntity } from 'src/watermeters/entities/watermeter.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('zones')
export class ZoneEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', name: 'district_id' })
  districtId: string;

  @OneToMany(() => WatermeterEntity, (watermeters) => watermeters.zone)
  watermeters: WatermeterEntity;

  @ManyToMany(() => EmployeeEntity, (employee) => employee.zones)
  @JoinTable()
  employee: EmployeeEntity[];
}
