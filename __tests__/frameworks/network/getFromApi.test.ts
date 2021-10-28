import { loadEnv } from '../../../bin/frameworks/system/loadEnv';
import { getFromApi } from '../../../bin/frameworks/network/getFromApi';

loadEnv();

const FIGMA_TOKEN = process.env.IS_MOCK_ENABLED ? 'mocked' : process.env.FIGMA_TOKEN;
const FIGMA_URL = process.env.IS_MOCK_ENABLED ? 'mocked' : process.env.FIGMA_URL;

describe('Failure cases', () => {
  test('It should throw an error when receiving invalid token and/or URL', async () => {
    await expect(getFromApi('asdf', 'invalid-url')).rejects.toThrowError();
  });

  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(getFromApi()).rejects.toThrowError();
  });

  test('It should not find data, given a token but invalid URL', async () => {
    expect(
      getFromApi('some-token-here', 'https://lkhjtkl34kljf-fg3kj3443.hjt3hjk.net/.kj34jkl34')
    ).rejects.toThrowError();
  });

  test('It should find valid data (assuming the base document ID to be "0:0") when passed valid token and URL', async () => {
    // @ts-ignore
    const DATA = await getFromApi(FIGMA_TOKEN, FIGMA_URL);
    expect(DATA.document.id).toEqual('0:0');
  });
});
