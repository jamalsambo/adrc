/* eslint-disable prettier/prettier */
import { IsUUID, IsArray, ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class RemoveZonesFromEmployeeDto {
  @IsUUID()
  @IsNotEmpty()
  employeeId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  zoneIds: string[];
}
