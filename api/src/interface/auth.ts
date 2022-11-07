import { IsEmail, MinLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class LoginArgs {
	@Field()
	@IsEmail()
	email: string;

	@Field()
	@MinLength(8)
	password: string;
}
