/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './roles.entity';
import { UserEntity } from './user.entity';

@Entity('permissions')
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  key: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'uuid', name: 'role_id', nullable: false })
  roleId: string;

  @ManyToOne(() => RoleEntity, (role) => role.permissions)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @ManyToMany(() => UserEntity, (permission) => permission.permissions)
  @JoinTable()
  users: UserEntity[];
}
