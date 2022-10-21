// prettier-ignore
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Address } from './addresses.entity';
import { Category } from './categories.entity';
import { Schedule } from './schedules.entity';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ default: false })
  sold: boolean;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  value: number;

  @Column({ type: 'integer' })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Category)
  categoryId: Category['id'];

  @OneToMany(() => Schedule, (schedule) => schedule.property)
  schedules: Schedule[];
}
