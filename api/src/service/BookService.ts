import { Service } from 'typedi';
import { Book } from '../entity/Book';
import { BookRepository } from '../repository/BookRepository';

@Service()
export class BookService {
	constructor(private readonly bookRepository: BookRepository) {}

	async getAll(): Promise<Book[]> {
		return this.bookRepository.findAll();
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
}
