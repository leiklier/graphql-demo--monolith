import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { TContext } from '../context';
import {
	BuyOwnBookInput,
	BuyOwnBookPayload,
	SellOwnBookInput,
	SellOwnBookPayload,
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

	@Mutation((returns) => SellOwnBookPayload, {
		description: 'Sell a Book that you own',
	})
	async sellOwnBook(
		@Ctx() context: TContext,
		@Arg('input') input: SellOwnBookInput,
	): Promise<SellOwnBookPayload> {
		const { message, bookSold } = await this.saleService.sellOwnBook(
			context,
			input.bookId,
		);

		const userSelling = await this.userService.getSelf(context);

		return {
			message,
			bookSold,
			userSelling,
		};
	}

	@Mutation((returns) => BuyOwnBookPayload, {
		description: 'Buy a Book for yourself',
	})
	async buyOwnBook(
		@Ctx() context: TContext,
		@Arg('input') input: BuyOwnBookInput,
	): Promise<BuyOwnBookPayload> {
		const { message, bookBought } = await this.saleService.buyOwnBook(
			context,
			input.bookId,
		);

		const userBuying = await this.userService.getSelf(context);

		return {
			message,
			bookBought,
			userBuying,
		};
	}
}
