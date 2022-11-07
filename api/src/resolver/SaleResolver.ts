import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { TContext } from '../context';
import {
	BuyBookInput,
	BuyBookPayload,
	SellBookInput,
	SellBookPayload,
} from '../interface/sale';
import { SaleService } from '../service/SaleService';
import { UserService } from '../service/UserService';

@Service()
@Resolver()
export class SaleResolver {
	constructor(
		private readonly saleService: SaleService,
		private readonly userService: UserService,
	) {}

	@Mutation((returns) => SellBookPayload, {
		description: 'Sell a Book that you own',
	})
	async sellBook(
		@Ctx() { authenticatedUserId }: TContext,
		@Arg('input') input: SellBookInput,
	): Promise<SellBookPayload> {
		const { message, bookSold } = await this.saleService.sellBookSelf(
			input.bookId,
			authenticatedUserId,
		);

		const userSelling = await this.userService.getSelfById(authenticatedUserId);

		return {
			message,
			bookSold,
			userSelling,
		};
	}

	@Mutation((returns) => BuyBookPayload, {
		description: 'Sell a Book',
	})
	async buyBook(
		@Ctx() { authenticatedUserId }: TContext,
		@Arg('input') input: BuyBookInput,
	): Promise<BuyBookPayload> {
		const { message, bookBought } = await this.saleService.buyBookSelf(
			input.bookId,
			authenticatedUserId,
		);

		const userBuying = await this.userService.getSelfById(authenticatedUserId);

		return {
			message,
			bookBought,
			userBuying,
		};
	}
}
