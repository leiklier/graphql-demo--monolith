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
		@Root() thisUser: User,
		@Ctx() context: TContext,
	): Promise<Book[]> {
		return this.bookService.getBooksOwnedByUser(context, thisUser.id);
	}

	@Query((returns) => User, {
		description: 'Get the authenticated User',
		nullable: true,
	})
	async me(@Ctx() context: TContext): Promise<User | null> {
		return this.userService.getSelf(context);
	}

	@Query((returns) => User, {
		description: 'Get a User with the provided `email`',
		nullable: true,
	})
	async userByEmail(
		@Ctx() context: TContext,
		@Arg('email') email: string,
	): Promise<User | null> {
		return this.userService.getOneByEmail(context, email);
	}

	@Query((returns) => [User], {
		description: 'Get all Users',
	})
	async allUsers(@Ctx() context: TContext): Promise<User[]> {
		return this.userService.getAll(context);
	}
}
