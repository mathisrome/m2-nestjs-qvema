import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import Roles from 'src/auth/roles';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  plainPassword: string;

  @Exclude()
  password: string | undefined;

  @IsNotEmpty()
  roles: Roles;
}
