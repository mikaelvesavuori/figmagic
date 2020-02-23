import trash from 'trash';

import { createFolder } from '../bin/functions/createFolder';

import { errorCreateFolder } from '../bin/meta/errors.mjs';

test('It should throw an error if no parameter is provided', async () => {
  expect.assertions(1);
  await expect(createFolder()).rejects.toThrow(errorCreateFolder);
});

/*
test('XXXXX', async () => {
  expect.assertions(1);

  const TEST_FOLDER = '___xxx';
  expect(async () => {
    await createFolder(TEST_FOLDER);
  }).toBe('[Function anonymous]');
  console.log('111');
  await trash([`${process.cwd()}/${TEST_FOLDER}`]);
  console.log('222');
});
*/
