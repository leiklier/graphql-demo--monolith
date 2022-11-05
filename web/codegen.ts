import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'http://api:4000/graphql',
	documents: ['src/**/*.graphql'],
	generates: {
		'./src/graphql/generated.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-react-apollo',
			],
		},
	},
	config: {
		withRefetchFn: true,
	},
};

export default config;
