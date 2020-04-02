import { parseCssFromElement } from '../bin/functions/process/parseCssFromElement';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    parseCssFromElement();
  }).toThrow();
});
