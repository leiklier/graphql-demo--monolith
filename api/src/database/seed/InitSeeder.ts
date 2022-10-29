import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { UserFactory } from '../factory/UserFactory';

export class InitSeeder extends Seeder {
	async run(datasource: DataSource) {
		await new UserFactory().create({ email: 'admin@admin.com' });
		await new UserFactory().createMany(10);
	}
}
