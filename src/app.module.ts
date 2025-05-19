import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { CaslModule } from 'nest-casl';
import { InterestsModule } from './interests/interests.module';
import { InvestmentsModule } from './investments/investments.module';
import Roles from './auth/roles';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ProjectsModule,
    CaslModule.forRoot<Roles>({
      getUserFromRequest: (request) => request.user,
    }),
    InterestsModule,
    InvestmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
