import { Configuration, Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const {
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DB,
} = process.env;

const ormConfig: Options<PostgreSqlDriver> | Configuration<PostgreSqlDriver> = {
	forceUtcTimezone: true,
	entities: ['./dist/entity'],
	entitiesTs: ['./src/entity'],
	baseDir: process.cwd(),
	dbName: POSTGRES_DB || '<UNSPECIFIED>',
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
	host: POSTGRES_HOST,
	port: parseInt(POSTGRES_PORT as string),
	type: 'postgresql',
	seeder: {
		path: './dist/database/seeder', // path to the folder with seeders
		pathTs: './src/database/seeder', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
		defaultSeeder: 'DatabaseSeeder', // default seeder class name
		glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
		emit: 'ts', // seeder generation mode
		fileName: (className: string) => className, // seeder file naming convention
	},
};

export default ormConfig;
