import { Field, InputType, ObjectType } from 'type-graphql';
import { Book } from '../entity/Book';
import { User } from '../entity/User';

@InputType({ description: 'The input for executing the `sellBook` Mutation' })
export class SellBookInput {
	@Field({ description: 'ID of the Book that should be sold' })
	bookId: string;
}

@ObjectType({
	description: 'The returned payload for executing the `sellBook` Mutation',
})
export class SellBookPayload {
	@Field({ description: 'Feedback on the outcome of the sale' })
	message: string;

	@Field((type) => User, {
		description: 'The User that previously owned the Book',
		nullable: true,
	})
	userSelling: User | null;

	@Field((type) => Book, {
		description: 'The Book that was sold',
		nullable: true,
	})
	bookSold: Book | null;
}

@InputType({ description: 'The input for executing the `buyBook` Mutation' })
export class BuyBookInput {
	@Field({ description: 'ID of the Book that should be bought' })
	bookId: string;
}

@ObjectType({
	description: 'The returned payload for executing the `buyBook` Mutation',
})
export class BuyBookPayload {
	@Field({ description: 'Feedback on the outcome of the sale' })
	message: string;

	@Field((type) => User, {
		description: 'The User that wants to buy the Book',
		nullable: true,
	})
	userBuying: User | null;

	@Field((type) => Book, {
		description: 'The Book that was bought',
		nullable: true,
	})
	bookBought: Book | null;
}
