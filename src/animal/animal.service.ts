import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AnimalRepository } from './animal.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAnimalFilterDto } from './dto/get-animal-filter.dto';
import { Animal } from './animal.entity';
import { CreateAnimalDto } from './dto/create-animal-dto';
import { UpdateAnimalDto } from './dto/update-animal-dto';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(AnimalRepository)
    private animalRepository: AnimalRepository,
  ) {}

  async getAnimals(getAnimalFilterDto: GetAnimalFilterDto): Promise<Animal[]> {
    return this.animalRepository.getAnimals(getAnimalFilterDto);
  }

  async getAnimalById(id: number): Promise<Animal> {
    const animal = this.animalRepository.findOne(id);

    if (!animal) {
      throw new NotFoundException(`Animal with ${id} not found.`);
    }

    return animal;
  }

  async createAnimal(
    createAnimalDto: CreateAnimalDto,
    file: Express.Multer.File,
  ): Promise<Animal> {
    return this.animalRepository.createAnimal(createAnimalDto, file);
  }

  async updateAnimal(
    id: number,
    updateAnimalDto: UpdateAnimalDto,
  ): Promise<Animal> {
    // check if animal exist with this id
    const animal = await this.getAnimalById(id);
    try {
      await this.animalRepository.save({
        animal,
        ...updateAnimalDto,
        id,
      });
      // return the animal with updates
      return await this.getAnimalById(id);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  async deleteAnimal(id: number): Promise<void> {
    const result = await this.animalRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Animal with id: ${id} not found.`);
    }
  }
}
