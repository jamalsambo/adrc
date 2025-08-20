/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReadingEntity } from './reading.entity';

@Entity('types_readings')
export class TypeReadingsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

    @OneToMany(()=> ReadingEntity, readings => readings.type)
    readings: ReadingEntity
}
