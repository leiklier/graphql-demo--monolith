import { IsEmail, MinLength } from 'class-validator';
import { Args, ArgsType, Field, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { AuthService } from '../service/AuthService';

@ArgsType()
export class LoginArgs {
	@Field()
	@IsEmail()
	email: string;

	@Field()
	@MinLength(8)
	password: string;
}

@Service()
@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Query((returns) => String)
	async login(@Args() { email, password }: LoginArgs) {
		return this.authService.login(email, password);
	}
}
