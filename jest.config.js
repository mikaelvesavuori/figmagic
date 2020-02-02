module.exports = {
	collectCoverage: true,
	coverageDirectory: 'jest-coverage',
	testEnvironment: 'node',
	transform: {
		'^.+\\.mjs$': 'babel-jest'
	},
	moduleFileExtensions: ['js', 'mjs'],
	testMatch: ['**/*.test.+(js|mjs)']
};
