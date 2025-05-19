import { Permissions, Actions, InferSubjects } from 'nest-casl';
import Role from 'src/auth/roles';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { Investment } from './entities/investment.entity';

export type Subjects = InferSubjects<
  typeof CreateInvestmentDto | typeof UpdateInvestmentDto | typeof Investment
>;

export const permissions: Permissions<Role, Subjects, Actions> = {
  investor({ can, user }) {
    can(Actions.delete, Investment, { 'investor.id': user.id });
  },
};
