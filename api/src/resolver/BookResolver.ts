import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Book } from '../entity/Book';
import { BookService } from '../service/BookService';

@Service()
@Resolver()
export class BookResolver {
	constructor(private readonly bookService: BookService) {}

	@Query((returns) => [Book], {
		description: 'Get all books that are stored in the system',
	})
	async booksInStore(): Promise<Book[]> {
		// We might change this to a more specific service
		// once we implement the concept of a store, but
		// the Query name will always stay the same:
		return this.bookService.getAll();
	}
}
