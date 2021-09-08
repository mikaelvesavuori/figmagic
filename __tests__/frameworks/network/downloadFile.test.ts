import trash from 'trash';
import fs from 'fs';

import { downloadFile } from '../../../bin/frameworks/network/downloadFile';

const FILENAME = `__downloadFile-success-image__.png`;

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(downloadFile()).rejects.toThrow();
  });

  test('It should fail if returning a non-200 status', async () => {
    await expect(
      downloadFile(
        'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0882/9cc7/c4731c8d0df07592cd6f7dc0519bb3bb-asdf',
        '__downloadFile-fail-image__.svg'
      )
    ).rejects.toBeNull();
  });
});

describe('Success cases', () => {
  test('It should download a file if given valid arguments', async () => {
    await downloadFile(
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      FILENAME
    ).then(() => {
      const FILE_EXISTS = fs.existsSync(FILENAME);
      expect(FILE_EXISTS).toBeTruthy();
    });
  });
});

afterAll(async () => {
  await trash(FILENAME);
});
