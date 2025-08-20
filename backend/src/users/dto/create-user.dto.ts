/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  displayName: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsBoolean()
  @IsOptional()
  inactive?: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dtInative?: Date;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsUUID()
  @IsNotEmpty()
  userTypeId: string;

  @IsUUID()
  @IsNotEmpty()
  delegationId: string;
}
