import { Field, ID, ObjectType } from 'type-graphql';
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './Book';

@ObjectType()
@Entity()
export class User {
	@Field((type) => ID)
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Field()
	@Column()
	firstName: string;

	@Field()
	@Column()
	lastName: string;

	@Field()
	@Column()
	email: string;

	@Column()
	hashedPassword: string;

	@Field((of) => [Book])
	@ManyToMany((relationTo) => Book, (book) => book.usersOwnedBy)
	@JoinTable()
	booksOwning: Book[];
}
