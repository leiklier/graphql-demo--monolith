import {
	Collection,
	Entity,
	Enum as EnumProperty,
	ManyToMany,
	PrimaryKey,
	Property,
} from '@mikro-orm/core';
import { Field, ID, ObjectType } from 'type-graphql';
import { AuthRole } from '../interface/auth';

import { Book } from './Book';

@ObjectType()
@Entity()
export class User {
	@Field((type) => ID)
	@PrimaryKey({ type: 'uuid' })
	readonly id: string;

	@Field()
	@Property()
	firstName: string;

	@Field()
	@Property()
	lastName: string;

	@Field()
	@Property({ unique: true })
	email: string;

	@Property()
	hashedPassword: string;

	@EnumProperty({ items: () => AuthRole, array: true })
	authRoles: AuthRole[];

	@Field((of) => [Book])
	@ManyToMany({ entity: 'Book', owner: true })
	booksOwning: Collection<Book> = new Collection<Book>(this);
}
