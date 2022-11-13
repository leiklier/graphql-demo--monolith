import { Factory, Faker } from '@mikro-orm/seeder';
import { User } from '../../entity/User';
import bcrypt from 'bcryptjs';
import { AuthRole } from '../../interface/auth';

export class UserFactory extends Factory<User> {
	model = User;

	definition(faker: Faker): Partial<User> {
		const salt = bcrypt.genSaltSync(10);

		const password = 'password';
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		return {
			id: faker.datatype.uuid(),
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(firstName, lastName),
			hashedPassword: bcrypt.hashSync(password, salt),
			authRoles: [AuthRole.User],
		};
	}
}
