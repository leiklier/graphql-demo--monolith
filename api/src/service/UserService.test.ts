import 'reflect-metadata';
import { UserService } from './UserService';
import { UserRepository } from '../repository/UserRepository';
import { faker } from '@faker-js/faker';
import { TContext } from '../context';
import { UserFactory } from '../database/factory/UserFactory';
import { MikroORM } from '@mikro-orm/core';
import { getMockOrm } from '../database';
import { AuthRole } from '../interface/auth';

const loggedOutContextMock: TContext = {
	authenticatedUser: null,
	requestId: '<some-request-id>',
};

const userContextMock: TContext = {
	authenticatedUser: {
		id: '<some-user-id>',
		firstName: 'User',
		lastName: 'Lastname',
		email: 'user@email.com',
		authRoles: [AuthRole.User],
	},
	requestId: '<some-request-id>',
};

describe('UserService', () => {
	let userRepository: UserRepository;
	let userService: UserService;
	let orm: MikroORM;
	beforeAll(async () => {
		// Mocks
		orm = await getMockOrm();
		jest
			.spyOn(UserRepository.prototype, 'findOneByEmail')
			.mockImplementation((email) =>
				Promise.resolve(new UserFactory(orm.em.fork()).makeOne({ email })),
			);
		jest
			.spyOn(UserRepository.prototype, 'findOneById')
			.mockImplementation((id) =>
				Promise.resolve(new UserFactory(orm.em.fork()).makeOne({ id })),
			);

		// Set-up
		userRepository = new UserRepository();
		userService = new UserService(userRepository);
	});

	describe('getOneByEmail', () => {
		it('should return a User with the given email when authenticated', async () => {
			const context = userContextMock;
			const email = faker.internet.email();
			const user = await userService.getOneByEmail(context, email);
			expect(user).toBeTruthy();
			expect(user!.email).toBe(email);
		});

		it('should return a User with the given email when not authenticated', async () => {
			const context = loggedOutContextMock;
			const email = faker.internet.email();
			const user = await userService.getOneByEmail(context, email);
			expect(user).toBeTruthy();
			expect(user!.email).toBe(email);
		});
	});

	describe('getSelf', () => {
		it('should return the User that is authenticated', async () => {
			const context = userContextMock;
			const user = await userService.getSelf(context);
			expect(user).toBeTruthy();
			expect(user!.id).toBe(context.authenticatedUser!.id);
		});

		it('should return null when not authenticated', async () => {
			const context: TContext = loggedOutContextMock;
			const user = await userService.getSelf(context);
			expect(user).toBeFalsy();
		});
	});
});
