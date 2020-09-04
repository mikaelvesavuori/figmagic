module.exports = {
  collectCoverage: true,
  coverageDirectory: 'jest-coverage',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  setupFiles: ['<rootDir>/jest.env.js'],
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  testTimeout: 30000
};
