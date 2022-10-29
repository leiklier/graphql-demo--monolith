import { useDataSource, useSeeders } from '@jorgebodega/typeorm-seeding';
import { PostgresDataSource } from './datasource';
import { InitSeeder } from './seed/InitSeeder';

export async function initializeDatabases(NODE_ENV: string) {
	// Create all database connections
	await PostgresDataSource.initialize();

	switch (NODE_ENV) {
		case 'develop':
			// Wipe databases:
			await PostgresDataSource.dropDatabase();
			// Synchronize schemas:
			await PostgresDataSource.synchronize();
			// Seed databases:
			useDataSource(PostgresDataSource);
			useSeeders(InitSeeder);
			break;
	}
}
