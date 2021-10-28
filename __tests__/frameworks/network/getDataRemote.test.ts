import { loadEnv } from '../../../bin/frameworks/system/loadEnv';
import { getDataRemote } from '../../../bin/frameworks/network/getDataRemote';

loadEnv();

const FIGMA_TOKEN = process.env.IS_MOCK_ENABLED ? 'mocked' : process.env.FIGMA_TOKEN;
const FIGMA_URL = process.env.IS_MOCK_ENABLED ? 'mocked' : process.env.FIGMA_URL;

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(getDataRemote()).rejects.toThrow();
  });

  test('It should fail given invalid URL and token', async () => {
    await expect(getDataRemote('token', 'invalid-url')).rejects.toThrow();
  });
});

describe('Success cases', () => {
  test('It should get API data given valid URL and token', async () => {
    await expect(
      // @ts-ignore
      getDataRemote(FIGMA_TOKEN, FIGMA_URL)
    ).resolves.toBeTruthy();
  });

  test('It should get API data given valid URL and token and a named version', async () => {
    await expect(
      // @ts-ignore
      getDataRemote(FIGMA_TOKEN, FIGMA_URL, 'Version 4.1.0')
    ).resolves.toBeTruthy();
  });
});
