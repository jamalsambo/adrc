/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserTypesEntity } from './type.entity';
import { ReadingEntity } from 'src/readings/entities/reading.entity';
import { EmployeeEntity } from 'src/employees/entities/employee.entity';
import { PermissionEntity } from './permission.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'display_name', nullable: false })
  displayName: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @Column({ type: 'boolean', default: false })
  inactive: boolean;

  @Column({ type: 'timestamp', name: 'dt_inative', nullable: true })
  dtInative: Date;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'uuid', name: 'user_type_id', nullable: true })
  userTypeId?: string;

  @Column({ type: 'uuid', name: 'delegation_id' })
  delegationId: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @ManyToOne(() => UserTypesEntity, (types) => types.users)
  @JoinColumn({ name: 'user_type_id' })
  userType: UserTypesEntity;

  @OneToMany(() => ReadingEntity, (readings) => readings.reader)
  readings: ReadingEntity;

  @OneToOne(() => EmployeeEntity, employee => employee.user)
  employee: EmployeeEntity

 @ManyToMany(() => PermissionEntity, (items) => items.users, {
    nullable: true,
  })
  @JoinTable({
    name: 'user_permissions',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: PermissionEntity[];
}
