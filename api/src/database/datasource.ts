import { DataSource } from 'typeorm';

const {
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DB,
	NODE_ENV,
} = process.env;

export const PostgresDataSource = new DataSource({
	type: 'postgres',
	database: POSTGRES_DB,
	username: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
	port: parseInt(POSTGRES_PORT as string),
	host: POSTGRES_HOST, // and host
	entities: ['src/entity/**/*.ts'],
	migrations: ['src/database/migrations/**/*.ts'],
	logger: 'advanced-console',
	logging: 'all',
	dropSchema: NODE_ENV === 'develop',
	synchronize: NODE_ENV === 'develop',
});
