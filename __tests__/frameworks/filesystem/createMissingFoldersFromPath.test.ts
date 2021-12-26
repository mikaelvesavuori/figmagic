import fs from 'fs';
import trash from 'trash';

import { createMissingFoldersFromPath } from '../../../bin/frameworks/filesystem/createMissingFoldersFromPath';

import { ErrorCreateMissingFoldersFromPath } from '../../../bin/frameworks/errors/errors';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(() => createMissingFoldersFromPath()).toThrowError(ErrorCreateMissingFoldersFromPath);
  });
});

describe('Success cases', () => {
  test('It should be able to successfully create a set of nested folders if they do not exist', async () => {
    const PATH = `./___createMissingFoldersFromPath1___/asdf/qwerty/`;

    createMissingFoldersFromPath(PATH);
    const FILE_EXISTS = fs.existsSync(PATH);
    expect(FILE_EXISTS).toBe(true);
    await trash('___createMissingFoldersFromPath1___');
  });

  test('It should not do anything if the path does not contain subfolders', async () => {
    const PATH = `./___createMissingFoldersFromPath2___`;

    createMissingFoldersFromPath(PATH);
    const FILE_EXISTS = fs.existsSync(PATH);
    expect(FILE_EXISTS).toBe(true);
    await trash('___createMissingFoldersFromPath2___');
  });

  test('It should not do anything if the path does not contain slashes', async () => {
    const PATH = `___createMissingFoldersFromPath3___`;

    createMissingFoldersFromPath(PATH);
    const FILE_EXISTS = fs.existsSync(PATH);
    expect(FILE_EXISTS).toBe(false);
    await trash('___createMissingFoldersFromPath3___');
  });
});
