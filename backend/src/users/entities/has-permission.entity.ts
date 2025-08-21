/* eslint-disable prettier/prettier */
import {  Entity,  JoinColumn,  ManyToOne, PrimaryColumn } from 'typeorm';
import { PermissionEntity } from './permission.entity';

@Entity('user_permissions')
export class UserPermissionEntity {
  @PrimaryColumn({ type: 'uuid', name: 'user_id', nullable: false })
  userId: string;

  @PrimaryColumn({ type: 'uuid', name: 'permission_id', nullable: false })
  permissionId: string;

  @ManyToOne(() => PermissionEntity, permission => permission.userPermissions)
  @JoinColumn({name: 'permission_id'})
  permission: PermissionEntity
}
