import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: 'A book that can be bought for the given priceUSD' })
@Entity()
export class Book {
	@Field((type) => ID, { description: 'A unique identifier for the book' })
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Field({ description: 'The title of the book' })
	@Column()
	title: string;

	@Field({ description: 'The person who wrote the book' })
	@Column()
	author: string;

	@Field({ description: 'The price of the book given in USD' })
	@Column()
	priceUSD: number;
}
