import { Service } from 'typedi';
import { TContext } from '../context';
import { Book } from '../entity/Book';
import { AuthRole } from '../interface/auth';
import { BookRepository } from '../repository/BookRepository';

@Service()
export class BookService {
	constructor(private readonly bookRepository: BookRepository) {}

	async getAllBooks(): Promise<Book[]> {
		return this.bookRepository.findAll();
	}

	async getBooksInStore(context: TContext): Promise<Book[]> {
		let bookIdsOwnedBySelf: string[] = [];
		if (context.authenticatedUser) {
			bookIdsOwnedBySelf = (
				await this.bookRepository.findManyByUserId(context.authenticatedUser.id)
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
		const isAdmin = context.authenticatedUser?.authRoles.includes(
			AuthRole.Admin,
		);
		const isSelf = context.authenticatedUser?.id === userId;

		if (isSelf || isAdmin) {
			return this.bookRepository.findManyByUserId(userId);
		}
		return [];
	}

	async getBooksOwnedBySelf(context: TContext): Promise<Book[]> {
		if (!context.authenticatedUser) {
			return [];
		}

		return this.getBooksOwnedByUser(context, context.authenticatedUser.id);
	}
}
