import trash from 'trash';

import { createFolder } from '../bin/functions/filesystem/createFolder';

import { errorCreateFolder } from '../bin/meta/errors.mjs';

test('It should throw an error if no parameter is provided', async () => {
  await expect(createFolder()).rejects.toThrow(errorCreateFolder);
});

test('XXXXX', async () => {
  const TEST_FOLDER = '___xxx';
  const PATH = `./${TEST_FOLDER}`;

  await expect(createFolder(PATH)).resolves.toBe(true);
  await trash([PATH]);
});
