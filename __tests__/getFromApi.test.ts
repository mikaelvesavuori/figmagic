import dotenv from 'dotenv';

import { getFromApi } from '../bin/functions/filesystem/getFromApi';

dotenv.config();

/*
test('It should throw an error if no parameter is provided', async () => {
  await expect(getFromApi()).rejects.toThrow();
});
*/

test('It should throw an error when receiving invalid token and/or URL', async () => {
  expect(await getFromApi('asdf', 'asdf')).toEqual(
    expect.objectContaining({ err: 'Invalid token', status: 403 })
  );
});

/*
TODO: Mock integration test

test('It should find valid data (assuming the base document ID to be "0:0") when passed valid token and URL', async () => {
  const DATA = await getFromApi(process.env.FIGMA_TOKEN, process.env.FIGMA_URL);
  expect(DATA.document.id).toEqual('0:0');
});
*/
