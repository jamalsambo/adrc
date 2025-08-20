/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InspectionEntity } from './inspection.entity';

@Entity('inspection_types')
export class InspectionTypesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', nullable: false})
  name: string

  @OneToMany(() => InspectionEntity, inspection => inspection.type)
  inspections: InspectionEntity[]
}
