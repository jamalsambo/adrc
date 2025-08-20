/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { CustomerHasWatermeterEntity } from './entities/has-watermeter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, CustomerHasWatermeterEntity])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
