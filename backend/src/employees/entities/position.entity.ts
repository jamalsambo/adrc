/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity('positions')
export class PositionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', nullable: false})
  name: string

  @OneToMany(() => EmployeeEntity, empoyees => empoyees.position)
  employees: EmployeeEntity[]

}
