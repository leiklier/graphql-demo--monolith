import { Service } from 'typedi';
import { Book } from '../entity/Book';
import { BookRepository } from '../repository/BookRepository';

@Service()
export class BookService {
	constructor(private readonly bookRepository: BookRepository) {}

	async getAll(): Promise<Book[]> {
		return this.bookRepository.findAll();
	}
}
