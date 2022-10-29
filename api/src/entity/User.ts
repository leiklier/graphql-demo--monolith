import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
