import { Exclude } from 'class-transformer';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column({ type: 'date' })
  date: string;

  @ManyToOne(() => Project, (project) => project.investments)
  project: Project;

  @ManyToOne(() => User, (user) => user.investments)
  @Exclude()
  investor: User;
}
