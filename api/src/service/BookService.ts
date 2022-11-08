import { Service } from 'typedi';
import { Book } from '../entity/Book';
import { BookRepository } from '../repository/BookRepository';

@Service()
export class BookService {
	constructor(private readonly bookRepository: BookRepository) {}

	async getAllBooks(): Promise<Book[]> {
		return this.bookRepository.findAll();
	}

	async getBooksInStore(authenticatedUserId: string | null): Promise<Book[]> {
		let bookIdsOwnedBySelf: string[] = [];
		if (authenticatedUserId) {
			bookIdsOwnedBySelf = (
				await this.bookRepository.findManyByUserId(authenticatedUserId)
			).map((book) => book.id);
		}

		const allBooks = await this.bookRepository.findAll();

		const booksNotOwnedBySelf = allBooks.filter(
			(book) => !bookIdsOwnedBySelf.includes(book.id),
		);

		return booksNotOwnedBySelf;
	}

	async getBooksOwnedByUser(
		userId: string,
		authenticatedUserId: string | null,
	): Promise<Book[]> {
		const isSelf = userId === authenticatedUserId;
		if (!isSelf) {
			return [];
		}
		return this.bookRepository.findManyByUserId(userId);
	}

	async getBooksOwnedBySelf(
		authenticatedUserId: string | null,
	): Promise<Book[]> {
		if (!authenticatedUserId) {
			return [];
		}

		return this.getBooksOwnedByUser(authenticatedUserId, authenticatedUserId);
	}
}
