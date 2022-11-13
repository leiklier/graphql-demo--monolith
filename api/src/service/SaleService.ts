import { Service } from 'typedi';
import { TContext } from '../context';
import { Book } from '../entity/Book';
import { error } from '../error';
import { UserRepository } from '../repository/UserRepository';

@Service()
export class SaleService {
	constructor(private readonly userRepository: UserRepository) {}

	async sellBook(
		context: TContext,
		customerUserId: string,
		bookId: string,
	): Promise<{ message: string; bookSold: Book | null }> {
		if (!context.authenticatedUser) {
			throw new Error(error.NOT_AUTHENTICATED);
		}

		const isAuthorized = customerUserId === context.authenticatedUser.id;
		if (!isAuthorized) {
			throw new Error(error.NOT_AUTHORIZED);
		}

		const bookSold = await this.userRepository.removeBookOwning(
			customerUserId,
			bookId,
		);

		return {
			message: 'The book was successfully sold',
			bookSold: bookSold,
		};
	}

	async sellOwnBook(
		context: TContext,
		bookId: string,
	): Promise<{ message: string; bookSold: Book | null }> {
		if (!context.authenticatedUser) {
			throw new Error(error.NOT_AUTHENTICATED);
		}
		return this.sellBook(context, context.authenticatedUser.id, bookId);
	}

	async buyBook(
		context: TContext,
		customerUserId: string,
		bookId: string,
	): Promise<{ message: string; bookBought: Book | null }> {
		if (!context.authenticatedUser) {
			throw new Error(error.NOT_AUTHENTICATED);
		}

		const isAuthorized = customerUserId === context.authenticatedUser.id;
		if (!isAuthorized) {
			throw new Error(error.NOT_AUTHORIZED);
		}

		const bookBought = await this.userRepository.addBookOwning(
			customerUserId,
			bookId,
		);

		return {
			message: 'The book was successfully bought',
			bookBought: bookBought,
		};
	}

	async buyOwnBook(
		context: TContext,
		bookId: string,
	): Promise<{ message: string; bookBought: Book | null }> {
		if (!context.authenticatedUser) {
			throw new Error(error.NOT_AUTHENTICATED);
		}
		return this.buyBook(context, context.authenticatedUser.id, bookId);
	}
}
