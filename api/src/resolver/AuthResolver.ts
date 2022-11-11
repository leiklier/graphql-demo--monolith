import { Args, Ctx, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { TContext } from '../context';
import { LoginArgs } from '../interface/auth';
import { AuthService } from '../service/AuthService';

@Service()
@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Query((returns) => String)
	async login(
		@Ctx() context: TContext,
		@Args() { email, password }: LoginArgs,
	): Promise<String> {
		return this.authService.login(context, email, password);
	}
}
