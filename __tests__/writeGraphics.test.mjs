import { writeGraphics } from '../bin/functions/filesystem/writeGraphics';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    writeGraphics();
  }).toThrow();
});
