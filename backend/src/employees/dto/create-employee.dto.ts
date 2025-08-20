/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsUUID, IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
      @IsNotEmpty()
      @IsString()
      number: string;
    
      @IsNotEmpty()
      @IsString()
      fullName: string;
    
      @IsNotEmpty()
      @IsDate()
      @Type(()=> Date)
      dateBirth: string;
    
      @IsNotEmpty()
      @IsString()
      gender: string;
    
      @IsNotEmpty()
      @IsUUID()
      delegationId: string;
    
      @IsUUID()
      @IsOptional()
      userId?: string;

      @IsUUID()
      @IsNotEmpty()
      positionId: string
    
      @IsNotEmpty()
      @IsUUID()
      createdBy: string;
}
