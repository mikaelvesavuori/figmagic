import fs from 'fs';
import trash from 'trash';

import { writeBaseJson } from '../../../bin/frameworks/filesystem/writeBaseJson';

const TEST_FOLDER = '__test-writeBaseJson';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(writeBaseJson()).rejects.toThrow();
  });

  test('It should throw an error if missing outputFolder"BaseFile', async () => {
    // @ts-ignore
    await expect(writeBaseJson(null, 'asdf', {})).rejects.toThrow();
  });

  test('It should throw an error if missing "figmaData"', async () => {
    // @ts-ignore
    await expect(writeBaseJson('asdf', null, {})).rejects.toThrow();
  });

  test('It should throw an error if missing "data"', async () => {
    // @ts-ignore
    await expect(writeBaseJson('asdf', 'asdf', null)).rejects.toThrow();
  });
});

describe('Success cases', () => {
  test('It should write the base Figma file', async () => {
    const testFile = '__test-writeBaseJson.txt';
    const path = `${TEST_FOLDER}/${testFile}`;
    await writeBaseJson(TEST_FOLDER, testFile, {
      data: 'something'
    });
    const fileContent = fs.readFileSync(path, { encoding: 'utf-8' });
    expect(fileContent).toBe(`{"data":"something"}`);
  });
});

afterAll(async () => {
  await trash(TEST_FOLDER);
});
