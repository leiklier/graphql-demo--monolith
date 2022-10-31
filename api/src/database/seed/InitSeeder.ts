import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { User } from '../../entity/User';
import { BookFactory } from '../factory/BookFactory';
import { UserFactory } from '../factory/UserFactory';

export class InitSeeder extends Seeder {
	async run(dataSource: DataSource) {
		const userRepository = dataSource.getRepository(User);

		// Create an admin user with fixed
		// id so that login token is valid
		// after re-seeding
		const admin = await new UserFactory().create({
			id: 'cacb8c46-9a5b-4e73-b643-b8b84fe00ba8',
			email: 'admin@admin.com',
		});

		// Create some random users and books
		const users = await new UserFactory().createMany(10);
		const books = await new BookFactory().createMany(10);

		// Let admin user own the first three books:
		admin.booksOwning = books.slice(0, 3);
		userRepository.save(admin);

		// Let all dummy users own three random books:
		for (const user of users) {
			const booksRandomized = books
				.slice()
				.sort(() => Math.random() - Math.random());
			user.booksOwning = booksRandomized.slice(0, 3);
			userRepository.save(user);
		}
	}
}
