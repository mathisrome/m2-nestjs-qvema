import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import Role from 'src/auth/role';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  plainPassword: string;

  @Exclude()
  password: string | undefined;

  @IsOptional()
  role: Role | undefined = Role.Entrepreneur;
}
