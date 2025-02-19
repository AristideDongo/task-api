import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseConfig } from 'src/core/config/database.config';

export const typeOrmConfig = (): TypeOrmModuleOptions => {
  return databaseConfig;
};
