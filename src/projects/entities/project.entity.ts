import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Category from '../category';
import { User } from 'src/users/entities/user.entity';
import { Investment } from 'src/investments/entities/investment.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  budget: number;

  @Column()
  category: Category;

  @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => Investment, (investement) => investement.project)
  investments: Investment[];
}
