import fs from 'fs';
import trash from 'trash';

import { createFolder } from '../../../bin/frameworks/filesystem/createFolder';
import { refresh } from '../../../bin/frameworks/filesystem/refresh';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    expect(() => refresh()).toThrow();
  });
});

describe('Success cases', () => {
  test('It should successfully create a folder that does not already exist', async () => {
    const testPath = `__test-refresh__`;
    const refreshedPath = refresh(testPath);
    expect(fs.existsSync(refreshedPath)).toBeTruthy();
  });

  test('It should successfully refresh an existing nested folder', async () => {
    const testPath = `__test-refresh__/something/folder`;
    createFolder(testPath);
    const refreshedPath = refresh(testPath);
    // @ts-ignore
    expect(fs.existsSync(refreshedPath)).toBeTruthy();
  });
});

afterAll(async () => {
  await trash(['__test-refresh__']);
});
