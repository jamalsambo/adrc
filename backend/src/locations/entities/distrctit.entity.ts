/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

Entity('districts')
export class DistrictEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'varchar'})
    name: string

    @Column({ type: 'varchar', name: 'province_id'})
    provinceId: string
}
