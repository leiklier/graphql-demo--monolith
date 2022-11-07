import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { TContext } from '../context';
import { Book } from '../entity/Book';
import { User } from '../entity/User';
import { BookService } from '../service/BookService';
import { UserService } from '../service/UserService';

@Service()
@Resolver((of) => User)
export class UserResolver {
	constructor(
		private readonly userService: UserService,
		private readonly bookService: BookService,
	) {}

	@FieldResolver()
	async booksOwning(
		@Root() user: User,
		@Ctx() { authenticatedUserId }: TContext,
	): Promise<Book[]> {
		return this.bookService.getBooksOwnedByUser(user.id, authenticatedUserId);
	}

	@Query((returns) => User, { nullable: true })
	async me(@Ctx() { authenticatedUserId }: TContext): Promise<User | null> {
		return this.userService.getSelfById(authenticatedUserId);
	}

	@Query((returns) => User)
	async user(@Arg('email') email: string): Promise<User | null> {
		return this.userService.getOneByEmail(email);
	}
}
