import { Permissions, Actions, InferSubjects } from 'nest-casl';
import Role from 'src/auth/roles';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from 'src/users/entities/user.entity';
import { Project } from './entities/project.entity';
import { log } from 'console';

export type Subjects = InferSubjects<
  typeof CreateProjectDto | typeof UpdateProjectDto | typeof Project
>;

export const permissions: Permissions<Role, Subjects, Actions> = {
  everyone({ can }) {
    can(Actions.read, 'all');
  },

  entrepreneur({ can, user }) {
    console.log(user);

    can(Actions.update, UpdateProjectDto, { user: user.id });
    can(Actions.delete, Project, { 'owner.id': user.id });
  },

  admin({ can }) {
    can(Actions.delete, 'all');
  },
};
