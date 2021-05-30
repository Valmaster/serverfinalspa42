import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  breed: string;

  @IsBoolean()
  isAdopted: boolean;

  @IsBoolean()
  isInFamily: boolean;

  @IsBoolean()
  gender: boolean;

  @IsDateString()
  arrivedAt: Date;

  @IsDateString()
  birthdate: Date;

  @IsNumber()
  typeId: number;
}
