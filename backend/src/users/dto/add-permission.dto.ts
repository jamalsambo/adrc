/* eslint-disable prettier/prettier */
import { IsUUID, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class addUserPermissionsDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  permissionIds: string[];
}
