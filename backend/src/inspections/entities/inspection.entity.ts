/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { InspectionTypesEntity } from './type.entity';
import { ReadingEntity } from 'src/readings/entities/reading.entity';
import { InspectionHasWatermeter } from './has-watermeter.entity';

@Entity('inspections')
export class InspectionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  number: string;

  @Column({ type: 'text' })
  month: string;

  @Column({ type: 'uuid', name: 'inspection_type_id',  nullable: false})
  inspectionTypeId: string

  @Column({ name: 'delegation_id', type: 'uuid' })
  delegationId: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Column({ name: 'createdBy', type: 'uuid' })
  createdBy: string;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @ManyToOne(() => InspectionTypesEntity, type => type.inspections)
  @JoinColumn({ name: 'inspection_type_id'})
  type: InspectionTypesEntity

  @OneToMany(() => ReadingEntity, readings => readings.inspection)
  readings: ReadingEntity[]

  @OneToMany(() => InspectionHasWatermeter, hasWatermeter => hasWatermeter.insp)
  hasWatermeters: InspectionHasWatermeter[]
}
