/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DelegationsService } from './delegations.service';
import { DelegationsController } from './delegations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DelegationEntity } from './entities/delegation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DelegationEntity])],
  controllers: [DelegationsController],
  providers: [DelegationsService],
  exports: [DelegationsService],
})
export class DelegationsModule {}
