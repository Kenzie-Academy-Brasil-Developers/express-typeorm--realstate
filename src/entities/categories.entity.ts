import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from './properties.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Property, (property) => property.categoryId)
  properties: Property[];
}
