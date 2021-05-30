import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type } from '../type/type.entity';

@Entity()
export class Animal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  breed: string;

  @Column()
  slug: string;

  @Column()
  is_adopted: boolean;

  @Column()
  is_in_family: boolean;

  @Column()
  gender: boolean;

  @Column()
  arrived_at: Date;

  @Column()
  birthdate: Date;

  @Column()
  created_at: Date;

  @Column()
  image: string;

  @ManyToOne(() => Type, (type) => type.animals, { eager: true })
  type: Type;

  @Column()
  typeId: number;
}
