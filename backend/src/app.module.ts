/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from '../data-source';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DelegationsModule } from './delegations/delegations.module';
import { CustomersModule } from './customers/customers.module';
import { EmployeesModule } from './employees/employees.module';
import { WatermetersModule } from './watermeters/watermeters.module';
import { AnomaliesModule } from './anomalies/anomalies.module';
import { ReadingsModule } from './readings/readings.module';
import { InspectionsModule } from './inspections/inspections.module';
import { LocationsModule } from './locations/locations.module';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Carrega as variáveis de ambiente
      isGlobal: true, // Torna o ConfigModule global
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    DelegationsModule,
    CustomersModule,
    EmployeesModule,
    WatermetersModule,
    AnomaliesModule,
    ReadingsModule,
    InspectionsModule,
    LocationsModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}
