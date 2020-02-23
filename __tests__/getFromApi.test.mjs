import dotenv from 'dotenv';

import { getFromApi } from '../bin/functions/getFromApi';

dotenv.config();

test('It should throw an error if no parameter is provided', () => {
  expect(async () => {
    await getFromApi();
  }).rejects.toThrow();
});

test('It should throw an error when receiving invalid token and/or URL', async () => {
  expect(await getFromApi('asdf', 'asdf')).toEqual(
    expect.objectContaining({ err: 'Invalid token', status: 403 })
  );
});

test('It should find valid data (assuming the base document ID to be "0:0") when passed valid token and URL', async () => {
  const DATA = await getFromApi(process.env.FIGMA_TOKEN, process.env.FIGMA_URL);
  expect(DATA.document.id).toEqual('0:0');
});
