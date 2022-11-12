import DataLoader from 'dataloader';
import { Service } from 'typedi';
import { getOrm } from '../database';
import { Book } from '../entity/Book';

@Service()
export class BookRepository {
	em = getOrm().em.fork();

	// DataLoader is required to avoid N+1 issue
	// with GraphQL resolvers. It is destroyed after
	// each request
	bookLoader = new DataLoader(
		async (bookIds: readonly string[]) => {
			const books = await this.em
				.createQueryBuilder(Book)
				.select('*')
				.where({ id: { $in: bookIds } })
				.getResultList();

			return bookIds.map(
				(bookId) => books.find((book) => book.id === bookId) || null,
			);
		},
		{ cache: false },
	);

	async findOneById(id: string): Promise<Book | null> {
		return this.bookLoader.load(id);
	}

	async findManyById(ids: string[]): Promise<Array<Book | null>> {
		// TODO: Fix type casting
		return (await this.bookLoader.loadMany(ids)) as Book[];
	}

	async findManyByUserId(userId: string): Promise<Book[]> {
		return this.em
			.createQueryBuilder(Book)
			.select('*')
			.where({ usersOwnedBy: userId })
			.getResultList();
	}

	async findAll(): Promise<Book[]> {
		return this.em.createQueryBuilder(Book).select('*').getResultList();
	}
}
