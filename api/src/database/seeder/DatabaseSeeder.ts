import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { BookFactory } from '../factory/BookFactory';
import { UserFactory } from '../factory/UserFactory';

export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		// Create some random books
		const books = await new BookFactory(em).create(10);

		// Create an admin user with fixed
		// id so that login token is valid
		// after re-seeding
		await new UserFactory(em)
			.each((adminUser) => {
				adminUser.booksOwning.set(books.slice(0, 3));
			})
			.createOne({
				id: 'cacb8c46-9a5b-4e73-b643-b8b84fe00ba8',
				email: 'admin@admin.com',
			});

		// Create some random users
		await new UserFactory(em)
			.each((user) => {
				const booksRandomized = books
					.slice()
					.sort(() => Math.random() - Math.random());
				user.booksOwning.set(booksRandomized.slice(0, 3));
			})
			.create(10);
	}
}
