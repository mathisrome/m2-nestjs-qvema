import { Exclude } from 'class-transformer';
import Role from 'src/auth/roles';
import { Investment } from 'src/investments/entities/investment.entity';
import Category from 'src/projects/category';
import { Project } from 'src/projects/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @Exclude()
  plainPassword: string | undefined;

  @Column()
  roles: Role = Role.Entrepreneur;

  @OneToMany(() => Project, (project) => project.owner)
  projects: Project[];

  @Column({
    type: 'simple-array',
    default: null,
  })
  interests: Category[] = [];

  @OneToMany(() => Investment, (investment) => investment.investor)
  investments: Investment[];
}
