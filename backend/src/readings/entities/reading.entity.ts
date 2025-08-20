/* eslint-disable prettier/prettier */
import { CustomerEntity } from 'src/customers/entities/customer.entity';
import { WatermeterEntity } from 'src/watermeters/entities/watermeter.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TypeReadingsEntity } from './type.entity';
import { AnomalyEntity } from 'src/anomalies/entities/anomaly.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { InspectionEntity } from 'src/inspections/entities/inspection.entity';

@Entity('readings')
export class ReadingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  number: string;

  @Column({ type: 'int' })
  reading: number;

  @Column({ name: 'foto_url', type: 'text', nullable: true })
  fotoUrl?: string;

  @Column({ name: 'delegation_id', type: 'uuid' })
  delegationId: string;

  @Column({ name: 'watermeter_id', type: 'uuid' })
  watermeterId: string;

  @Column({ name: 'customer_id', type: 'uuid' })
  customerId: string;

  @Column({ name: 'type_reading_id', type: 'uuid' })
  typeReadingId: string;

  @Column({ name: 'anomaly_id', type: 'uuid', nullable: true })
  anomalyId?: string;

  @Column({ name: 'inspection_id', type: 'uuid', nullable: false })
  inspectionId?: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @ManyToOne(() => WatermeterEntity, (watermeter) => watermeter.readings)
  @JoinColumn({ name: 'watermeter_id' })
  watermeter: WatermeterEntity;

  @ManyToOne(() => CustomerEntity, (customer) => customer.readings)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @ManyToOne(() => TypeReadingsEntity, (type) => type.readings)
  @JoinColumn({ name: 'type_reading_id' })
  type: TypeReadingsEntity;

  @ManyToOne(() => AnomalyEntity, (anomaly) => anomaly.readings)
  @JoinColumn({ name: 'anomaly_id' })
  anomaly: AnomalyEntity;

  @ManyToOne(() => InspectionEntity, (inspection) => inspection.readings)
  @JoinColumn({ name: 'inspection_id' })
  inspection: InspectionEntity;

  @ManyToOne(() => UserEntity, (user) => user.readings)
  @JoinColumn({ name: 'user_id' })
  reader: UserEntity;
}
