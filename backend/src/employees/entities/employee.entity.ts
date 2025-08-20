/* eslint-disable prettier/prettier */
import { InspectionHasWatermeter } from 'src/inspections/entities/has-watermeter.entity';
import { ZoneEntity } from 'src/locations/entities/zone.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { PositionEntity } from './position.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('employees')
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  number: string;

  @Column({ name: 'full_name', type: 'varchar', nullable: false })
  fullName: string;

  @Column({ name: 'date_birth', type: 'date', nullable: false })
  dateBirth: Date;

  @Column({ type: 'varchar', nullable: false })
  gender: string;

  @Column({ name: 'delegation_id', type: 'uuid' })
  delegationId: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId?: string;

  @Column({ name: 'position_id', type: 'uuid', nullable: true })
  positionId: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Column({ name: 'createdBy', type: 'uuid' })
  createdBy: string;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @Column({ name: 'updatedBy', type: 'uuid', nullable: true })
  updatedBy?: string;

  @ManyToMany(() => ZoneEntity, (zone) => zone.employee, {
    nullable: true,
  })
  @JoinTable({
    name: 'employee_has_zones',
    joinColumn: {
      name: 'employee_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'zone_id',
      referencedColumnName: 'id',
    },
  })
  zones: ZoneEntity[];

  @OneToMany(() => InspectionHasWatermeter, inspections => inspections.employee)
  hasInspections: InspectionHasWatermeter[]

  @ManyToOne(() => PositionEntity, position => position.employees)
  @JoinColumn({ name: 'position_id' })
  position: PositionEntity

  @OneToOne(() => UserEntity, user => user.employee)
  @JoinColumn({ name: 'user_id'})
  user: UserEntity

}
