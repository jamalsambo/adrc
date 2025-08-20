/* eslint-disable prettier/prettier */
import { IsUUID, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateEmployeeHasZoneDto {
  @IsUUID()
  @IsNotEmpty()
  employeeId: string;

@IsArray()
@ArrayNotEmpty()
@IsUUID('all', { each: true })
zoneIds: string[];


  @IsUUID()
  @IsNotEmpty()
  createdBy: string;
}
