import * as fs from 'fs';
import trash from 'trash';

import { createFolder } from '../../../bin/frameworks/filesystem/createFolder';
import { refresh } from '../../../bin/frameworks/filesystem/refresh';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(() => refresh()).toThrow();
  });
});

describe('Success cases', () => {
  test('It should successfully soft-refresh (delete if pre-existing; else create) a folder', async () => {
    const testPath = `__test-refresh-soft__`;
    await trash([testPath]);

    refresh(testPath, 'soft');

    expect(fs.existsSync(testPath)).toBeTruthy();
    await trash([testPath]);
  });

  test('It should successfully hard-refresh (delete if pre-existing; else create) a folder', async () => {
    const testPath = `__test-refresh-hard__`;
    await trash([testPath]);

    refresh(testPath, 'hard');

    expect(fs.existsSync(testPath)).toBeTruthy();
    await trash([testPath]);
  });

  test('It should successfully soft-refresh (delete if pre-existing; else create) a nested folder', async () => {
    const testPath = `__test-refresh-soft__/something/folder`;
    await trash(['__test-refresh-soft__']);

    createFolder(testPath);
    refresh(testPath, 'soft');

    expect(fs.existsSync(testPath)).toBeTruthy();
    await trash(['__test-refresh-soft__']);
  });

  test('It should successfully hard-refresh (delete if pre-existing; else create) a nested folder', async () => {
    const testPath = `__test-refresh-hard__/something/folder`;
    await trash(['__test-refresh-hard__']);

    createFolder(testPath);
    refresh(testPath, 'hard');

    expect(fs.existsSync(testPath)).toBeTruthy();
    await trash(['__test-refresh-hard__']);
  });
});
