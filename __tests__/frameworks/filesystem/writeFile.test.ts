import fs from 'fs';
import trash from 'trash';

import { WriteOperation } from '../../../bin/contracts/Write';

import { writeFile } from '../../../bin/frameworks/filesystem/writeFile';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    expect(() => writeFile()).toThrowError();
  });

  test('It should throw an error if given an empty operation', async () => {
    // @ts-ignore
    expect(() => writeFile({})).toThrowError();
  });

  test('It should throw an error if given an operation with invalid type', async () => {
    // @ts-ignore
    const invalidOperation = {
      file: 1,
      path: 1,
      name: 1,
      type: 1,
      format: 1,
      metadata: 1,
      templates: 1
    } as WriteOperation;
    // @ts-ignore
    expect(() => writeFile(invalidOperation)).toThrowError();
  });

  test('It should throw an error if an invalid type is provided', () => {
    const name = '__test-writefile0.txt';
    const payload = { something: 1234 };

    const writeOp: WriteOperation = {
      type: 'story',
      file: JSON.stringify(payload),
      path: './',
      name: name,
      // @ts-ignore
      format: 'invalid',
      overwrite: {
        css: false,
        description: false,
        graphic: false,
        react: false,
        storybook: false,
        styled: false
      }
    };

    expect(() => writeFile(writeOp)).toThrowError();
  });

  test('It should throw an error if missing templates when writing CSS', async () => {
    const name = '__test-writefile23.txt';
    const payload = { something: 1234 };

    const writeOp: WriteOperation = {
      type: 'story',
      file: JSON.stringify(payload),
      path: './',
      name: name,
      format: 'css',
      overwrite: {
        css: false,
        description: false,
        graphic: false,
        react: false,
        storybook: false,
        styled: false
      }
    };

    expect(() => writeFile(writeOp)).toThrowError();
    await trash(`${__dirname}/${name}`);
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
          templatePathReact: 'templates/react',
          templatePathStorybook: 'templates/story',
          templatePathStyled: 'templates/styled',
          templatePathGraphic: 'templates/graphic'
        },
        overwrite: {
          css: false,
          description: false,
          graphic: false,
          react: false,
          storybook: false,
          styled: false
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
          templatePathReact: 'templates/react',
          templatePathStorybook: 'templates/story',
          templatePathStyled: 'templates/styled',
          templatePathGraphic: 'templates/graphic'
        },
        overwrite: {
          css: false,
          description: false,
          graphic: false,
          react: false,
          storybook: false,
          styled: false
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
