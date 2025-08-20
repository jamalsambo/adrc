/* eslint-disable prettier/prettier */
import {
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';

export class CreateReadingDto {
  @IsNotEmpty()
  @IsInt()
  reading: number

  @IsOptional()
  @IsString()
  fotoUrl?: string;

  @IsNotEmpty()
  @IsUUID()
  delegationId: string;

  @IsNotEmpty()
  @IsUUID()
  watermeterId: string;

  @IsNotEmpty()
  @IsUUID()
  customerId: string;

  @IsNotEmpty()
  @IsUUID()
  typeReadingId: string;

  @IsOptional()
  @IsUUID()
  anomalyId?: string;

  @IsNotEmpty()
  @IsUUID()
  inspectionId: string

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
