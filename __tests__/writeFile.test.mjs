import trash from 'trash';

import { writeFile } from '../bin/functions/writeFile';

test('It should throw an error if no parameter is provided', async () => {
  await expect(writeFile()).rejects.toThrow();
});

test('It can write to a file if provided input', () => {
  const FILE = '__test-writefile1.txt';
  writeFile(JSON.stringify({ something: 1234 }), './', FILE);
  trash(`__test-writefile*`);
});

test('It can write a token to a file if provided input', () => {
  const FILE = '__test-writefile2.txt';
  writeFile(JSON.stringify({ something: 1234 }), './', FILE, true);
  trash(`__test-writefile*`);
});
