import * as fs from 'fs';
import trash from 'trash';

import { refresh } from '../../../bin/frameworks/filesystem/refresh';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(() => refresh()).toThrow();
  });
});

describe('Success cases', () => {
  test('It should successfully refresh (delete if pre-existing; else create) a folder', async () => {
    const testPath = `__test-refresh__`;
    await trash([`./${testPath}`]);

    refresh(testPath, 'hard');

    const FILE_EXISTS = fs.existsSync(testPath);
    expect(FILE_EXISTS).toBeTruthy();

    await trash([`./${testPath}`]);
  });
});
