// TODO: TEST

import trash from 'trash';

import { WriteOperation } from '../../bin/app/contracts/Write';

import { writeFile } from '../../bin/frameworks/filesystem/writeFile';

describe('Failure cases', () => {
  test('It should throw an error if no parameter is provided', async () => {
    // @ts-ignore
    await expect(() => writeFile()).rejects.toBeTruthy();
  });

  test('It should throw an error if an invalid type is provided', async () => {
    const name = '__test-writefile0.txt';
    const payload = { something: 1234 };

    const writeOp: WriteOperation = {
      type: 'story',
      file: JSON.stringify(payload),
      path: './',
      name: name,
      format: 'invalid'
    };

    await expect(writeFile(writeOp)).rejects.toThrowError();
  });

  test('It should throw an error if missing templates when writing CSS', async () => {
    const name = '__test-writefile23.txt';
    const payload = { something: 1234 };

    const writeOp: WriteOperation = {
      type: 'story',
      file: JSON.stringify(payload),
      path: './',
      name: name,
      format: 'css'
    };

    await expect(writeFile(writeOp)).rejects.toThrowError();
    trash(`${__dirname}/${name}`);
  });

  test('It should fail', async () => {
    const name = '__test-writefile23.txt';
    const payload = { something: 1234 };

    const writeOp: WriteOperation = {
      type: 'story',
      file: JSON.stringify(payload),
      path: './',
      name: name,
      format: 'mjs',
      //metadata: {},
      templates: {
        templatePathReact: 'templates/react.jsx',
        templatePathStorybook: 'templates/story.js',
        templatePathStyled: 'templates/styled.jsx'
      }
    };

    await expect(writeFile(writeOp)).rejects.toThrowError();
    trash(`${__dirname}/${name}`);
  });
});

describe('Success cases', () => {
  test('It should successfully write a raw file if provided valid input', async () => {
    const name = '__test-writefile1.txt';
    const payload = { something: 1234 };

    const writeOp: WriteOperation = {
      type: 'raw',
      file: JSON.stringify(payload),
      path: './',
      name: name,
      format: 'mjs',
      //metadata: {},
      templates: {
        templatePathReact: 'templates/react.jsx',
        templatePathStorybook: 'templates/story.js',
        templatePathStyled: 'templates/styled.jsx'
      }
    };

    await expect(async () => {
      await writeFile(writeOp);
      await trash(`__test-writefile*`);
    }).resolves.toBeTruthy();
  });

  test('It should successfully write a token to a file if provided valid input', async () => {
    const name = '__test-writefile2.txt';
    const payload = { something: 1234 };

    const writeOp: WriteOperation = {
      type: 'token',
      file: JSON.stringify(payload),
      path: './',
      name: name,
      format: 'mjs',
      //metadata: {},
      templates: {
        templatePathReact: 'templates/react.jsx',
        templatePathStorybook: 'templates/story.js',
        templatePathStyled: 'templates/styled.jsx'
      }
    };

    await expect(writeFile(writeOp)).resolves.toBeTruthy();
    await trash(`__test-writefile*`);
  });
});
