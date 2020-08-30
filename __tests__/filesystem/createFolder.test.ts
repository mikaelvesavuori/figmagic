import trash from 'trash';

import { createFolder } from '../../bin/frameworks/filesystem/createFolder';

import { ErrorCreateFolder } from '../../bin/frameworks/errors/errors';

describe('Failure cases', () => {
  test('It should throw an error if no parameter is provided', async () => {
    expect.assertions(1);
    // @ts-ignore
    await expect(createFolder()).rejects.toEqual(ErrorCreateFolder);
  });
});

describe('Success cases', () => {
  test('It should be able to successfully create a new folder if it does not exist', async () => {
    const TEST_FOLDER = '___xxx';
    const PATH = `./${TEST_FOLDER}`;

    await expect(createFolder(PATH)).resolves.toBe(true);
    await trash([PATH]);
  });

  test('It should be able to successfully work if folder exists', async () => {
    const TEST_FOLDER = '___xxx';
    await createFolder(TEST_FOLDER);
    const PATH = `./${TEST_FOLDER}`;

    await expect(createFolder(PATH)).resolves.toBe(true);
    await trash([PATH]);
  });
});
