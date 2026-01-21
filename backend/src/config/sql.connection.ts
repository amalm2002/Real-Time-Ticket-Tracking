import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/user.entities';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.SQL_HOST,
    port: Number(process.env.SQL_PORT),
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
    synchronize: true,
    logging: false,
    entities: [User],
});

export const connectSQL = async (): Promise<void> => {
    try {
        await AppDataSource.initialize();
        console.log('✅ SQL Database connected');
    } catch (error) {
        console.error('❌ Error connecting to SQL DB:', error);
    }
};