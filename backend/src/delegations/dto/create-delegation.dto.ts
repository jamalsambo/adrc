/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDelegationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  districtId: string;
}
