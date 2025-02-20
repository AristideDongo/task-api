import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Auth } from 'src/auth/entities/auth.entity';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/users/entities/user.entiy';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Auth, User, Task],
  synchronize: true, // À mettre à false en production
  logging: false,
};
