/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateWatermeterDto } from './create-watermeter.dto';
import { IsUUID } from 'class-validator';

export class UpdateWatermeterDto extends PartialType(CreateWatermeterDto) {
    @IsUUID()
      updatedBy?: string;
    
}
