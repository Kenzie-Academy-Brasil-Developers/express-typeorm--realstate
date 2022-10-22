import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Schedule } from './schedules.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  isAdm: boolean;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Column({ default: true })
  readonly isActive: boolean;

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules: Schedule[];
}
