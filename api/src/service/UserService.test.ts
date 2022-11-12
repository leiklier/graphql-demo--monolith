import 'reflect-metadata';
import { UserService } from './UserService';
import { UserRepository } from '../repository/UserRepository';
import { faker } from '@faker-js/faker';
import { TContext } from '../context';

describe('UserService', () => {
	// Declarations
	let context: TContext;
	let userRepository: UserRepository;
	let userService: UserService;

	// Setup
	beforeAll(() => {
		// Mocks
		context = {
			authenticatedUserId: 'userId',
			requestId: 'reqId',
		};
		jest
			.spyOn(UserRepository.prototype, 'findOneByEmail')
			.mockImplementation((email) =>
				Promise.resolve({
					id: faker.datatype.uuid(),
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					email,
					hashedPassword: '1234',
					booksOwning: [],
				}),
			);

		// Set-up
		userRepository = new UserRepository();
		userService = new UserService(userRepository);
	});

	describe('getOneByEmail', () => {
		it('should return a User with the given email', async () => {
			const email = faker.internet.email();
			const user = await userService.getOneByEmail(context, email);
			expect(user!.email).toBe(email);
			expect(user!.booksOwning).toBe([]);
			expect(user!.firstName).toBe('Leik'); // Should fail
		});
	});
});
