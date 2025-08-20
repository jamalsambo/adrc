/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
