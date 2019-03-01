module.exports = {
	//preset: 'jest-puppeteer',
	transform: {
		'^.+\\.mjs$': 'babel-jest'
	},
	moduleFileExtensions: ['js', 'mjs'],
	rootDir: '__tests__/',
	//setupFilesAfterEnv: '<rootDir>/setup.js',
	testMatch: ['**/*.test.+(js|mjs)']
};
