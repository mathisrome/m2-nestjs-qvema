import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config(); // charger les variables d'environnement

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'mariadb',
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'toto44',
  database: process.env.DATABASE_NAME || 'qvema',
  autoLoadEntities: true,
  synchronize: true,
};
