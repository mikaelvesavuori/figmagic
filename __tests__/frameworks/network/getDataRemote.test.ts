import { loadEnv } from '../../../bin/frameworks/system/loadEnv';
import { getDataRemote } from '../../../bin/frameworks/network/getDataRemote';

loadEnv();

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
      getDataRemote(process.env.FIGMA_TOKEN, process.env.FIGMA_URL)
    ).resolves.toBeTruthy();
  });

  test('It should get API data given valid URL and token and a named version', async () => {
    await expect(
      // @ts-ignore
      getDataRemote(process.env.FIGMA_TOKEN, process.env.FIGMA_URL, 'Version 4.1.0')
    ).resolves.toBeTruthy();
  });
});
