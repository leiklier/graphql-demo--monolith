import { Args, Ctx, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { TContext } from '../context';
import { LoginArgs, LoginPayload } from '../interface/auth';
import { AuthService } from '../service/AuthService';

@Service()
@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Query((returns) => LoginPayload, { nullable: true })
	async login(
		@Ctx() context: TContext,
		@Args() { email, password }: LoginArgs,
	): Promise<LoginPayload | null> {
		const token = await this.authService.login(context, email, password);

		if (!token) {
			return null;
		}

		return { token };
	}
}
