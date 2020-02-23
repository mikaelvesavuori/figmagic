import { writeFile } from '../bin/functions/writeFile';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    writeFile();
  }).toThrow();
});
