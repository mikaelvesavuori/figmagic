import { getElements } from '../bin/functions/getElements';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    getElements();
  }).toThrow();
});
