/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserTypesEntity } from './entities/type.entity';
import { RoleEntity } from './entities/roles.entity';
import { PermissionEntity } from './entities/permission.entity';
import { UserPermissionEntity } from './entities/has-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserTypesEntity, RoleEntity, PermissionEntity, UserPermissionEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
