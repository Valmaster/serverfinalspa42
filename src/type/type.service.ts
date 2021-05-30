import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeRepository } from './type.repository';
import { CreateTypeDto } from './dto/create-type-dto';
import { Type } from './type.entity';
import { UpdateAnimalDto } from '../animal/dto/update-animal-dto';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(TypeRepository)
    private typeRepository: TypeRepository,
  ) {}

  async getTypes(): Promise<Type[]> {
    return await this.typeRepository.find();
  }

  async getTypeById(id: number): Promise<Type> {
    const type = await this.typeRepository.findOne(id);

    if (!type) {
      throw new NotFoundException(`Type with ${id} doesn't exist.`);
    }

    return type;
  }

  async createType(createTypeDto: CreateTypeDto): Promise<Type> {
    return await this.typeRepository.createType(createTypeDto);
  }

  async updateType(
    updateAnimalDto: UpdateAnimalDto,
    id: number,
  ): Promise<Type> {
    const type = await this.getTypeById(id);
    try {
      await this.typeRepository.save({
        type,
        ...updateAnimalDto,
        id,
      });
      return await this.getTypeById(id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deleteType(id: number): Promise<void> {
    const result = await this.typeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Type with id: ${id} not found.`);
    }
  }
}
