import { parseTypographyStylingFromElement } from '../bin/functions/process/parseTypographyStylingFromElement';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    parseTypographyStylingFromElement();
  }).toThrow();
});
