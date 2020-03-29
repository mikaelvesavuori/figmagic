import { parseCssFromDescription } from '../bin/functions/process/parseCssFromDescription';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    parseCssFromDescription();
  }).toThrow();
});
