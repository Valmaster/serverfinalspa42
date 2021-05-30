import { IsOptional, IsString } from 'class-validator';

export class UpdateTypeDto {
  @IsOptional()
  @IsString()
  name?: string;
}
