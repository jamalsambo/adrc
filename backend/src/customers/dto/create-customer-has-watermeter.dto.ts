/* eslint-disable prettier/prettier */
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateCustomerHasWatermeterDto {
  @IsNotEmpty()
  @IsUUID()
  customerId: string;

  @IsNotEmpty()
  @IsUUID()
  watermeterId: string;

  @IsNotEmpty()
  @IsUUID()
  createdBy: string;
}
