// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import * as dotenv from 'dotenv';
import { Auth } from 'src/auth/entities/auth.entity';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/users/entities/user.entity';

// dotenv.config();

// export const databaseConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   url: process.env.DATABASE_URL,
//   entities: [Auth, User, Task],
//   synchronize: false, // À mettre à false en production
//   migrations: ['src/database/*-migrations.ts'],
//   migrationsRun: false,
//   logging: true,
// };

import { DataSource } from 'typeorm';
// import { Auth } from './auth/entities/auth.entity';
// import { User } from './users/entities/user.entity';
// import { Task } from './task/entities/task.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSources = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Auth, User, Task],
  synchronize: false, // À mettre à false en production
  migrations: ['src/database/*-migrations.ts'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSources;
