import { TypeService } from './type.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type-dto';
import { AuthGuard } from '@nestjs/passport';
import { Type } from './type.entity';
import { UpdateAnimalDto } from '../animal/dto/update-animal-dto';

@Controller('types')
export class TypeController {
  constructor(private typeService: TypeService) {}

  @Get()
  getTypes(): Promise<Type[]> {
    return this.typeService.getTypes();
  }

  @Get('/:id')
  getTypeById(@Param('id', ParseIntPipe) id: number): Promise<Type> {
    return this.typeService.getTypeById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createType(@Body() createTypeDto: CreateTypeDto): Promise<Type> {
    return this.typeService.createType(createTypeDto);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  updateType(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ): Promise<Type> {
    return this.typeService.updateType(updateAnimalDto, id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  deleteType(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.typeService.deleteType(id);
  }
}
