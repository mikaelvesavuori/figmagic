import { writeElements } from '../bin/functions/writeElements';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    writeElements();
  }).toThrow();
});
