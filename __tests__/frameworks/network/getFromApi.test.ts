import dotenv from 'dotenv';

import { getFromApi } from '../../../bin/frameworks/network/getFromApi';

dotenv.config();

describe('Failure cases', () => {
  test('It should throw an error when receiving invalid token and/or URL', async () => {
    expect(await getFromApi('asdf', 'asdf')).toEqual(
      expect.objectContaining({ err: 'Invalid token', status: 403 })
    );
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

  //TODO: Mock integration test

  test('It should find valid data (assuming the base document ID to be "0:0") when passed valid token and URL', async () => {
    const DATA = await getFromApi(process.env.FIGMA_TOKEN, process.env.FIGMA_URL);
    expect(DATA.document.id).toEqual('0:0');
  });
});
