/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
	testPathIgnorePatterns: ['/node_modules/'],
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	collectCoverage: true,
};
