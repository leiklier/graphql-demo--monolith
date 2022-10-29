import { ApolloError } from 'apollo-server-core';

export const error = {
	INVALID_EMAIL: new ApolloError('Invalid email'),
	INVALID_PASSWORD: new ApolloError('Invalid password'),
};
