import { Exclude } from 'class-transformer';
import Role from 'src/auth/role';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  role: Role = Role.Entrepreneur;
}
