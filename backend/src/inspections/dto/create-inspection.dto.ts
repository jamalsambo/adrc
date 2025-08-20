/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateInspectionDto {
  @IsNotEmpty()
  @IsUUID()
  delegationId: string;

  @IsNotEmpty()
  @IsUUID()
  inspectionTypeId: string

  @IsNotEmpty()
  @IsUUID()
  createdBy: string;
}
