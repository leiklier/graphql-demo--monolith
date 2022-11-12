import {
	Collection,
	Entity,
	ManyToMany,
	PrimaryKey,
	Property,
} from '@mikro-orm/core';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './User';

@ObjectType({ description: 'A book that can be bought for the given priceUSD' })
@Entity()
export class Book {
	@Field((type) => ID, { description: 'A unique identifier for the book' })
	@PrimaryKey({ type: 'uuid' })
	readonly id: string;

	@Field({ description: 'The title of the book' })
	@Property()
	title: string;

	@Field({ description: 'The person who wrote the book' })
	@Property()
	author: string;

	@Field({ description: 'The price of the book given in USD' })
	@Property()
	priceUSD: number;

	@ManyToMany(() => User, (user) => user.booksOwning)
	usersOwnedBy: Collection<User> = new Collection<User>(this);
}
