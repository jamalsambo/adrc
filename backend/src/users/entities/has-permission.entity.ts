/* eslint-disable prettier/prettier */
import {  Entity, PrimaryColumn } from 'typeorm';

@Entity('user_permissions')
export class UserPermissionEntity {
  @PrimaryColumn({ type: 'uuid', name: 'user_id', nullable: false })
  userId: string;

  @PrimaryColumn({ type: 'uuid', name: 'permission_id', nullable: false })
  permissionId: string;
}
