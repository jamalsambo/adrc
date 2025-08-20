/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('delegations')
export class DelegationEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'district_id', type: 'uuid', nullable: false })
  districtId: string;
}
