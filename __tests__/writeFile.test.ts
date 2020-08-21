import trash from 'trash';

import { writeFile } from '../bin/functions/filesystem/writeFile';

/*
test('It should throw an error if no parameter is provided', async () => {
  await expect(writeFile()).rejects.toThrow();
});

test('It should throw an error if an invalid type is provided', async () => {
  const NAME = '__test-writefile0.txt';
  await expect(writeFile({ something: 1234 }, './', NAME, 'invalid')).rejects.toThrow();
});

test('It should throw an error if missing templates when writing CSS', async () => {
  const NAME = '__test-writefile23.txt';
  await expect(writeFile({ something: 1234 }, './', NAME, 'css')).rejects.toThrow();
});
*/

test('It should successfully write a raw file if provided valid input', async () => {
  const NAME = '__test-writefile1.txt';
  await writeFile(JSON.stringify({ something: 1234 }), './', NAME, 'raw');
  await trash(`__test-writefile*`);
});

test('It should successfully write a token to a file if provided valid input', async () => {
  const NAME = '__test-writefile2.txt';
  await writeFile(JSON.stringify({ something: 1234 }), './', NAME, 'token', true);
  await trash(`__test-writefile*`);
});

test('It should fail', async () => {
  const NAME = '__test-writefile23.txt';
  await expect(
    writeFile(
      { something: 1234 },
      './',
      NAME,
      'story',
      'mjs',
      {},
      {
        templates: {
          templatePathReact: 'templates/react.jsx',
          templatePathStorybook: 'templates/story.js',
          templatePathStyled: 'templates/styled.jsx'
        }
      }
    )
  ).rejects.toThrow();
});
