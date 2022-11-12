import 'reflect-metadata';
import { UserService } from './UserService';
import { UserRepository } from '../repository/UserRepository';
import { faker } from '@faker-js/faker';
import { TContext } from '../context';
import { UserFactory } from '../database/factory/UserFactory';
import { MikroORM } from '@mikro-orm/core';
import { getMockOrm } from '../database';

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
			const context: TContext = {
				requestId: 'some-request-id',
				authenticatedUserId: 'some-user-id',
			};
			const email = faker.internet.email();
			const user = await userService.getOneByEmail(context, email);
			expect(user).toBeTruthy();
			expect(user!.email).toBe(email);
		});

		it('should return a User with the given email when not authenticated', async () => {
			const context: TContext = {
				requestId: 'some-request-id',
				authenticatedUserId: null,
			};
			const email = faker.internet.email();
			const user = await userService.getOneByEmail(context, email);
			expect(user).toBeTruthy();
			expect(user!.email).toBe(email);
		});
	});

	describe('getSelf', () => {
		it('should return the User that is authenticated', async () => {
			const context: TContext = {
				requestId: 'some-request-id',
				authenticatedUserId: 'some-user-id',
			};
			const user = await userService.getSelf(context);
			expect(user).toBeTruthy();
			expect(user!.id).toBe(context.authenticatedUserId);
		});

		it('should return null when not authenticated', async () => {
			const context: TContext = {
				requestId: 'some-request-id',
				authenticatedUserId: null,
			};
			const user = await userService.getSelf(context);
			expect(user).toBeFalsy();
		});
	});
});
