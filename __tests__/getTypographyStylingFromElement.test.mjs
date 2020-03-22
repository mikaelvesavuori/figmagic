import { getTypographyStylingFromElement } from '../bin/functions/getTypographyStylingFromElement';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    getTypographyStylingFromElement();
  }).toThrow();
});
