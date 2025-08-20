/* eslint-disable prettier/prettier */
import { ReadingEntity } from 'src/readings/entities/reading.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CustomerHasWatermeterEntity } from './has-watermeter.entity';

@Entity('customers')
export class CustomerEntity {
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

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Column({ name: 'createdBy', type: 'uuid' })
  createdBy: string;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @Column({ name: 'updatedBy', type: 'uuid', nullable: true })
  updatedBy?: string;

  @OneToMany(() => ReadingEntity, (readings) => readings.customer)
  readings: ReadingEntity[];

  @OneToMany(
    () => CustomerHasWatermeterEntity,
    (hasWatermeters) => hasWatermeters.customer,
  )
  hasWatermeters: CustomerHasWatermeterEntity[];
}
