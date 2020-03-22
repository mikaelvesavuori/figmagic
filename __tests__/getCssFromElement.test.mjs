import { getCssFromElement } from '../bin/functions/getCssFromElement';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    getCssFromElement();
  }).toThrow();
});
