/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionEntity } from './permission.entity';


@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', nullable: false})
  name: string

  @OneToMany(() => PermissionEntity, permissions => permissions.role)
  permissions: PermissionEntity[]
} 
