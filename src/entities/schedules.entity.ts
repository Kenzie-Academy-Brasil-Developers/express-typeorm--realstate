import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from './properties.entity';
import { User } from './users.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'date' })
  date: Date | string;

  @Column({ type: 'time' })
  hour: Date | string;

  @ManyToOne(() => Property, { eager: true })
  property: Property;

  @ManyToOne(() => User, { eager: true })
  user: User;
}
