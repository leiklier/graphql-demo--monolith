import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import ormConfig from './mikro-orm.config';
import { DatabaseSeeder } from './seeder/DatabaseSeeder';

let orm: MikroORM<PostgreSqlDriver>;

export async function getMockOrm(): Promise<MikroORM<PostgreSqlDriver>> {
	return MikroORM.init<PostgreSqlDriver>({
		...ormConfig,
		connect: false,
		dbName: '<FIELD_CANNOT_BE_EMPTY>',
	});
}

export async function initializeDatabase(
	nodeEnv: string,
): Promise<MikroORM<PostgreSqlDriver>> {
	orm = await MikroORM.init<PostgreSqlDriver>(ormConfig);
	if ((nodeEnv = 'develop')) {
		const generator = orm.getSchemaGenerator();
		await generator.refreshDatabase(); // ensure db exists and is fresh
		await generator.clearDatabase(); // removes all data

		const seeder = orm.getSeeder();
		await seeder.seed(DatabaseSeeder);
	}

	return orm;
}

export function getOrm() {
	return orm;
}

export function getEntityManager() {
	return orm.em.fork();
}
