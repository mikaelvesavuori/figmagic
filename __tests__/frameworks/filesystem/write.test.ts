import trash from 'trash';
import fs from 'fs';

import { write } from '../../../bin/frameworks/filesystem/write';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(() => write()).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should successfully create a file on disk', async () => {
    const FILE_PATH = `./__write-success-test__.txt`;
    const FILE_CONTENT = 'Something here';

    write(FILE_PATH, FILE_CONTENT);
    const DISK_CONTENTS = fs.readFileSync(FILE_PATH, { encoding: 'utf-8' });
    expect(DISK_CONTENTS).toBe(FILE_CONTENT);

    await trash(FILE_PATH);
  });
});
