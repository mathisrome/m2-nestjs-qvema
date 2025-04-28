import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
