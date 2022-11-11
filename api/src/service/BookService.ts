import { Service } from 'typedi';
import { TContext } from '../context';
import { Book } from '../entity/Book';
import { BookRepository } from '../repository/BookRepository';

@Service()
export class BookService {
	constructor(private readonly bookRepository: BookRepository) {}

	async getAllBooks(): Promise<Book[]> {
		return this.bookRepository.findAll();
	}

	async getBooksInStore(context: TContext): Promise<Book[]> {
		let bookIdsOwnedBySelf: string[] = [];
		if (context.authenticatedUserId) {
			bookIdsOwnedBySelf = (
				await this.bookRepository.findManyByUserId(context.authenticatedUserId)
			).map((book) => book.id);
		}

		const allBooks = await this.bookRepository.findAll();

		const booksNotOwnedBySelf = allBooks.filter(
			(book) => !bookIdsOwnedBySelf.includes(book.id),
		);

		return booksNotOwnedBySelf;
	}

	async getBooksOwnedByUser(
		context: TContext,
		userId: string,
	): Promise<Book[]> {
		return this.bookRepository.findManyByUserId(userId);
	}

	async getBooksOwnedBySelf(context: TContext): Promise<Book[]> {
		if (!context.authenticatedUserId) {
			return [];
		}

		return this.getBooksOwnedByUser(context, context.authenticatedUserId);
	}
}
