/* eslint-disable prettier/prettier */
import { ReadingEntity } from 'src/readings/entities/reading.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('anomalies')
export class AnomalyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'varchar' })
  name: string;

    @OneToMany(()=> ReadingEntity, readings => readings.anomaly)
    readings: ReadingEntity
}
