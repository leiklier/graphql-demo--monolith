import { useDataSource, useSeeders } from '@jorgebodega/typeorm-seeding';
import { PostgresDataSource } from './datasource';
import { InitSeeder } from './seed/InitSeeder';

export async function initializeDatabases(NODE_ENV: string) {
	// Create all database connections
	await PostgresDataSource.initialize();

	switch (NODE_ENV) {
		case 'develop':
			// Seed databases with some sample data:
			useDataSource(PostgresDataSource);
			useSeeders(InitSeeder);
			break;
	}
}
