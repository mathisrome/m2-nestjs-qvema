import Role from "src/auth/role";

export class CreateUserDto {
  email: string;
  name: string;
  plainPassword: string;
  role: Role = Role.Entrepreneur;
}
