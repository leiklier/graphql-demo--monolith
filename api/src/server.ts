import { ApolloServer } from 'apollo-server-express';
import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolver/UserResolver';
import { initializeDatabases } from './database/initialize';

const PORT = 4000;
const { NODE_ENV } = process.env;

async function main() {
	await initializeDatabases(NODE_ENV || 'production');

	const graphqlSchema = await buildSchema({
		resolvers: [UserResolver],
	});

	const app = express();
	const httpServer: http.Server = http.createServer(app);
	app.use(bodyParser.json());

	const server: ApolloServer = new ApolloServer({
		schema: graphqlSchema,
		csrfPrevention: true,
		context: () => {},
		introspection: NODE_ENV === 'develop',
		plugins: [
			// Enable GraphQL Playground:
			ApolloServerPluginLandingPageLocalDefault({ embed: true }),
			// Make ApolloServer shut down gracefully on exit:
			ApolloServerPluginDrainHttpServer({ httpServer }),
		],
	});

	await server.start();

	server.applyMiddleware({
		app,
		cors: {
			origin: getCorsOriginsFromEnv(),
			credentials: true,
		},
	});

	await httpServer.listen(PORT, () => {
		console.log(`🚀 Server started on port ${PORT}.`);
	});
}

function getCorsOriginsFromEnv() {
	const { ACCESS_CONTROL_ALLOW_ORIGIN: corsString } = process.env;
	if (!corsString) return false;

	const corsOrigins = String(corsString).split(';');
	return corsOrigins;
}

main();
