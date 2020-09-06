import trash from 'trash';
import * as fs from 'fs';

import { write } from '../../bin/frameworks/filesystem/write';

// TODO: Test loc 21

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(write()).rejects.toThrowError();
  });
});

describe('Success cases', () => {
  test('It should successfully create a file on disk', async () => {
    const filePath = `./__asdf__.txt`;
    const fileContent = 'Something here';

    write(filePath, fileContent);
    const _fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
    expect(_fileContent).toBe(fileContent);

    trash(filePath);
  });
});
