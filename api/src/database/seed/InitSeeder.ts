import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { UserFactory } from '../factory/UserFactory';

export class InitSeeder extends Seeder {
	async run(datasource: DataSource) {
		await new UserFactory().create({
			id: 'cacb8c46-9a5b-4e73-b643-b8b84fe00ba8',
			email: 'admin@admin.com',
		});
		await new UserFactory().createMany(10);
	}
}
