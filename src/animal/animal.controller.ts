import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { GetAnimalFilterDto } from './dto/get-animal-filter.dto';
import { Animal } from './animal.entity';
import { CreateAnimalDto } from './dto/create-animal-dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateAnimalDto } from './dto/update-animal-dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('animals')
export class AnimalController {
  constructor(private animalService: AnimalService) {}

  @Get()
  getAnimals(
    @Body(ValidationPipe) getAnimalFilterDto: GetAnimalFilterDto,
  ): Promise<Animal[]> {
    return this.animalService.getAnimals(getAnimalFilterDto);
  }

  @Get('/:id')
  getAnimalById(@Param('id', ParseIntPipe) id: number): Promise<Animal> {
    return this.animalService.getAnimalById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image'))
  createAnimal(
    @Body() createAnimalDto: CreateAnimalDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Animal> {
    console.log(createAnimalDto, file);
    return this.animalService.createAnimal(createAnimalDto, file);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  updateAnimal(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ): Promise<Animal> {
    return this.animalService.updateAnimal(id, updateAnimalDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  deleteAnimal(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.animalService.deleteAnimal(id);
  }
}
