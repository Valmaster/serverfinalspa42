import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetAnimalFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

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
  birthdate?: Date;

  @IsOptional()
  @IsNumber()
  typeId?: number;
}
