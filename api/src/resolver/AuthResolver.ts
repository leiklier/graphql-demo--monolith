import { Args, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { LoginArgs } from '../interface/auth';
import { AuthService } from '../service/AuthService';

@Service()
@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Query((returns) => String)
	async login(@Args() { email, password }: LoginArgs) {
		return this.authService.login(email, password);
	}
}
