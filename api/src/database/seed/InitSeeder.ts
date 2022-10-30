import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { BookFactory } from '../factory/BookFactory';
import { UserFactory } from '../factory/UserFactory';

export class InitSeeder extends Seeder {
	async run(datasource: DataSource) {
		// Create an admin user with fixed
		// id so that token is valid after
		// re-seeding
		await new UserFactory().create({
			id: 'cacb8c46-9a5b-4e73-b643-b8b84fe00ba8',
			email: 'admin@admin.com',
		});
		await new UserFactory().createMany(10);
		await new BookFactory().createMany(10);
	}
}
