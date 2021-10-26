import { mockServer } from './__tests__/mocks';

// Allow mocking to be enabled / disabled
if (process.env.IS_MOCK_ENABLED === 'true') {
  // Establish API mocking before all tests.
  beforeAll(() => mockServer.listen());

  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => mockServer.resetHandlers());

  // Clean up after the tests are finished.
  afterAll(() => mockServer.close());
}
