import { Factory, FactorizedAttrs } from '@jorgebodega/typeorm-factory';
import { User } from '../../entity/User';
import { faker } from '@faker-js/faker';
import { PostgresDataSource } from '../datasource';

export class UserFactory extends Factory<User> {
	protected entity = User;
	// TODO: Find a way to move DataSource out
	protected dataSource = PostgresDataSource;
	protected attrs(): FactorizedAttrs<User> {
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		return {
			id: faker.datatype.uuid(),
			firstName: () => faker.name.firstName(),
			lastName: () => faker.name.lastName(),
			email: faker.internet.email(firstName, lastName),
		};
	}
}
