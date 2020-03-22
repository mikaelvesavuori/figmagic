import { parseCssFromDescription } from '../bin/functions/parseCssFromDescription';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    parseCssFromDescription();
  }).toThrow();
});
