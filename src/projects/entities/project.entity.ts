import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Category from '../category';
import { User } from 'src/users/entities/user.entity';

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

  @ManyToOne(() => User, (user) => user.projects)
  owner: User;
}
