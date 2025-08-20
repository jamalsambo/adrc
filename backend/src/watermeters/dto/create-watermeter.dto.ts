/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateWatermeterDto {
  @IsNotEmpty()
  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toString())
  lantitude: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toString())
  longitude: string;

  @IsNotEmpty()
  @IsUUID()
  delegationId: string;

  @IsOptional()
  @IsUUID()
  zoneId?: string;

  @IsOptional()
  @IsString()
  status?: string

  @IsNotEmpty()
  @IsUUID()
  createdBy: string;
}
