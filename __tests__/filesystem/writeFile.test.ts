import * as fs from 'fs';
import trash from 'trash';

import { WriteOperation } from '../../bin/contracts/Write';

import { writeFile } from '../../bin/frameworks/filesystem/writeFile';

// TODO: Test loc 18-25

describe('Failure cases', () => {
  /*
  // TODO: FIX since this destroys correct execution of Success cases?
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(() => writeFile()).rejects.toBeTruthy();
  });
  */

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
});

describe('Success cases', () => {
  describe('Raw', () => {
    test('It should successfully write a raw file if provided valid input', async () => {
      const payload = { something: 1234 };

      const writeOp: WriteOperation = {
        type: 'raw',
        file: JSON.stringify(payload),
        path: './',
        name: '__test-writefile-raw',
        format: 'mjs',
        //metadata: {},
        templates: {
          templatePathReact: 'templates/react.jsx',
          templatePathStorybook: 'templates/story.js',
          templatePathStyled: 'templates/styled.jsx'
        }
      };

      const file = `${writeOp.name}`;

      writeFile(writeOp);

      const fileContent = fs.readFileSync(file, { encoding: 'utf-8' });
      expect(fileContent).toBe(`"{\\"something\\":1234}"`);
      await trash(file);
    });
  });

  describe('Token', () => {
    test('It should successfully write a token to a file if provided valid input', async () => {
      const payload = { something: 1234 };

      const writeOp: WriteOperation = {
        type: 'token',
        file: JSON.stringify(payload),
        path: './',
        name: '__test-writefile-token',
        format: 'mjs',
        //metadata: {},
        templates: {
          templatePathReact: 'templates/react.jsx',
          templatePathStorybook: 'templates/story.js',
          templatePathStyled: 'templates/styled.jsx'
        }
      };

      const file = `${writeOp.name}.${writeOp.format}`;

      writeFile(writeOp);

      const fileContent = fs.readFileSync(file, { encoding: 'utf-8' });
      const includesContent = fileContent.includes(
        `const __test-writefile-token = "{\\"something\\":1234}"`
      );
      expect(includesContent).toBe(true);
      await trash(file);
    });
  });
});
