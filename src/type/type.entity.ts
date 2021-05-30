import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Animal } from '../animal/animal.entity';

@Entity()
export class Type extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Animal, (animal) => animal.type, { eager: false })
  animals: Animal[];
}
