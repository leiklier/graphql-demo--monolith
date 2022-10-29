import { Query, Resolver } from 'type-graphql';
import { PostgresDataSource } from '../database/datasource';
import { User } from '../entity/User';

@Resolver()
export class UserResolver {
	@Query((returns) => String)
	hello() {
		return 'hi!';
	}

	@Query((returns) => [User])
	users() {
		return PostgresDataSource.getRepository(User).find();
	}
}
