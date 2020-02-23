import { loadFile } from '../bin/functions/loadFile';

import { errorLoadFile } from '../bin/meta/errors.mjs';

test('It should throw an error if no parameter is provided', () => {
  expect.assertions(1);
  expect(loadFile()).rejects.toThrow(errorLoadFile);
});

test('It should return data from local file', async () => {
  const FILE = await loadFile(`${process.cwd()}/.figmagicrc`);
  expect(FILE).toEqual(expect.objectContaining({ something: 1234 }));
});
