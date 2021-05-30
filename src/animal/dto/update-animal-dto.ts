import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAnimalDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  breed?: string;

  @IsOptional()
  @IsBoolean()
  isAdopted?: boolean;

  @IsOptional()
  @IsBoolean()
  isInFamily?: boolean;

  @IsOptional()
  @IsBoolean()
  gender?: boolean;

  @IsOptional()
  @IsDateString()
  arrivedAt?: Date;

  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @IsOptional()
  @IsNumber()
  typeId?: number;
}
