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
	async allBooks(): Promise<Book[]> {
		return this.bookService.getAll();
	}
}
