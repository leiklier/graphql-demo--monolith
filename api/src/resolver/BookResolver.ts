import { Ctx, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { TContext } from '../context';
import { Book } from '../entity/Book';
import { BookService } from '../service/BookService';

@Service()
@Resolver()
export class BookResolver {
	constructor(private readonly bookService: BookService) {}

	@Query((returns) => [Book], {
		description: 'Get all books that are available in the store',
	})
	async booksInStore(
		@Ctx() { authenticatedUserId }: TContext,
	): Promise<Book[]> {
		return this.bookService.getBooksInStore(authenticatedUserId);
	}
}
