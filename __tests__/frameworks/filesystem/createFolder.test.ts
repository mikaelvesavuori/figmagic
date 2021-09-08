import fs from 'fs';
import trash from 'trash';

import { createFolder } from '../../../bin/frameworks/filesystem/createFolder';

import { ErrorCreateFolder } from '../../../bin/frameworks/errors/errors';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(() => createFolder()).toThrowError(ErrorCreateFolder);
  });
});

describe('Success cases', () => {
  test('It should be able to successfully create a new folder if it does not exist', async () => {
    const TEST_FOLDER = '___xxx';
    const PATH = `./${TEST_FOLDER}`;

    createFolder(PATH);
    const FILE_EXISTS = fs.existsSync(PATH);
    expect(FILE_EXISTS).toBe(true);
    await trash(PATH);
  });

  test('It should be able to successfully work if folder exists', async () => {
    const TEST_FOLDER = '___xxx';
    createFolder(TEST_FOLDER);
    const PATH = `./${TEST_FOLDER}`;

    createFolder(PATH);
    const FILE_EXISTS = fs.existsSync(PATH);
    expect(FILE_EXISTS).toBe(true);
    await trash(PATH);
  });
});
