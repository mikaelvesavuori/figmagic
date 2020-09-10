import trash from 'trash';
import * as fs from 'fs';

import { downloadFile } from '../../../bin/frameworks/network/downloadFile';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(downloadFile()).rejects.toThrow();
  });

  test('It should fail if returning a non-200 status', async () => {
    await downloadFile(
      'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0882/9cc7/c4731c8d0df07592cd6f7dc0519bb3bb-asdf',
      '__testing/testfile.svg'
    );
  });
});

describe('Success cases', () => {
  test('It should download a file if given valid arguments', async () => {
    const FILENAME = `__downloadFile-success-image__.png`;
    await downloadFile(
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      FILENAME
    );
    const FILE_EXISTS = fs.existsSync(FILENAME);
    expect(FILE_EXISTS).toBeTruthy();
    await trash(FILENAME);
  });
});
