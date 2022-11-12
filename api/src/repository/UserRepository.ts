import DataLoader from 'dataloader';
import { Service } from 'typedi';
import { getEntityManager } from '../database';
import { Book } from '../entity/Book';
import { User } from '../entity/User';

@Service()
export class UserRepository {
	// DataLoader is required to avoid N+1 issue
	// with GraphQL resolvers. It is destroyed after
	// each request
	userLoader = new DataLoader(
		async (userIds: readonly string[]) => {
			const users = await getEntityManager()
				.createQueryBuilder(User)
				.select('*')
				.where({ id: { $in: userIds } })
				.getResultList();

			return userIds.map(
				(userId) => users.find((user) => user.id === userId) || null,
			);
		},
		{ cache: false },
	);

	async findOneById(id: string): Promise<User | null> {
		return await this.userLoader.load(id);
	}

	async findManyById(ids: string[]): Promise<Array<User | null>> {
		// TODO: Fix type casting
		return (await this.userLoader.loadMany(ids)) as User[];
	}

	async findAll(): Promise<User[]> {
		return getEntityManager()
			.createQueryBuilder(User)
			.select('*')
			.getResultList();
	}

	async findOneByEmail(email: string): Promise<User | null> {
		return getEntityManager()
			.createQueryBuilder(User)
			.select('*')
			.where({ email })
			.getSingleResult();
	}

	async removeBookOwning(userId: string, bookId: string): Promise<Book | null> {
		const em = getEntityManager();
		const user = await em
			.createQueryBuilder(User)
			.select('*')
			.where({ id: userId })
			.getSingleResult();

		if (!user) {
			return null;
		}

		const book = await em
			.createQueryBuilder(Book)
			.select('*')
			.where({ id: bookId })
			.getSingleResult();

		if (!book) {
			return null;
		}

		await user.booksOwning.init();
		const isAlreadyOwning = user.booksOwning.contains(book);
		if (!isAlreadyOwning) {
			return null;
		}

		user.booksOwning.init();
		user.booksOwning.remove(book);
		await em.persist(user).flush();

		return book;
	}

	async addBookOwning(userId: string, bookId: string): Promise<Book | null> {
		const em = getEntityManager();

		const user = await em
			.createQueryBuilder(User)
			.select('*')
			.where({ id: userId })
			.getSingleResult();

		if (!user) {
			return null;
		}

		const book = await em
			.createQueryBuilder(Book)
			.select('*')
			.where({ id: bookId })
			.getSingleResult();

		if (!book) {
			return null;
		}

		await user.booksOwning.init();
		const isAlreadyOwning = user.booksOwning.contains(book);

		if (isAlreadyOwning) {
			return null;
		}

		user.booksOwning.add(book);
		await em.persist(user).flush();

		return book;
	}
}
