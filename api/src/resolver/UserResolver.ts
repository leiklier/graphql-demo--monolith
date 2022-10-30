import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { ContextValue } from '../context';
import { User } from '../entity/User';
import { UserService } from '../service/UserService';

@Service()
@Resolver((of) => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query((returns) => String)
	hello(): string {
		return 'hi!';
	}

	@Query((returns) => User, { nullable: true })
	async me(@Ctx() { userId }: ContextValue): Promise<User | null> {
		console.log({ userId });
		return this.userService.getSelfById(userId);
	}

	@Query((returns) => User)
	async user(@Arg('email') email: string): Promise<User | null> {
		return this.userService.getOneByEmail(email);
	}
}
