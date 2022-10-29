import { Arg, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { User } from '../entity/User';
import { UserService } from '../service/UserService';

@Service()
@Resolver((of) => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query((returns) => String)
	hello() {
		return 'hi!';
	}

	@Query((returns) => User)
	user(@Arg('email') email: string): Promise<User | null> {
		return this.userService.findOneByEmail(email);
	}
}
