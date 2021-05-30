import { EntityRepository, Repository } from 'typeorm';
import { Animal } from './animal.entity';
import { GetAnimalFilterDto } from './dto/get-animal-filter.dto';
import { CreateAnimalDto } from './dto/create-animal-dto';

@EntityRepository(Animal)
export class AnimalRepository extends Repository<Animal> {
  async getAnimals(getAnimalFilterDto: GetAnimalFilterDto): Promise<Animal[]> {
    const { name, breed, isAdopted, isInFamily, gender, birthdate, typeId } =
      getAnimalFilterDto;
    // Query filter animals
    const query = this.createQueryBuilder('animal');
    query.innerJoinAndSelect('animal.type', 'type');
    if (name) query.andWhere('animal.name LIKE :name', { name: `%${name}%` });
    if (breed)
      query.andWhere('animal.breed LIKE :breed', { breed: `%${breed}%` });
    if (isAdopted)
      query.andWhere('animal.is_adopted = :is_adopted', { isAdopted });
    if (isInFamily)
      query.andWhere('animal.is_in_family = :is_in_family', { isInFamily });
    if (gender) query.andWhere('animal.gender = :gender', { gender });
    if (birthdate)
      query.andWhere('animal.birthdate = :birthdate', { birthdate });
    if (typeId) query.andWhere('animal.typeId = :typeId', { typeId });

    return await query.getMany();
  }

  async createAnimal(
    createAnimalDto: CreateAnimalDto,
    file: Express.Multer.File,
  ): Promise<Animal> {
    const {
      name,
      description,
      breed,
      isAdopted,
      isInFamily,
      gender,
      arrivedAt,
      birthdate,
      typeId,
    } = createAnimalDto;
    const animal = new Animal();
    animal.name = name;
    animal.description = description;
    animal.breed = breed;
    animal.is_adopted = isAdopted;
    animal.is_in_family = isInFamily;
    animal.gender = gender;
    animal.arrived_at = arrivedAt;
    animal.birthdate = birthdate;
    animal.slug = name;
    animal.created_at = new Date();
    animal.typeId = typeId;
    animal.image = file.originalname;
    /*        animal = {
            ...createAnimalDto,
            slug: 'lol-lol',
            created_at: new Date()
        };*/
    await animal.save();

    return animal;
  }
}
