import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import AppDataSources from './core/config/database.config';

dotenv.config();

const AppDataSource = new DataSource(AppDataSources.options);

export default AppDataSource;
