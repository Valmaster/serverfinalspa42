import { EntityRepository, Repository } from 'typeorm';
import { Type } from './type.entity';
import { CreateTypeDto } from './dto/create-type-dto';

@EntityRepository(Type)
export class TypeRepository extends Repository<Type> {
  async createType(createTypeDto: CreateTypeDto): Promise<Type> {
    const { name } = createTypeDto;
    const type = new Type();

    type.name = name;

    await type.save();

    return type;
  }
}
