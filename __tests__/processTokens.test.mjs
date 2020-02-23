import { processTokens } from '../bin/functions/processTokens';

/*
test('It should normalize the unit, given a width, px basis, and a conversion type', () => {
  expect(processTokens(400, 'px', 'rem')).toBe('25rem');
});
*/

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    processTokens();
  }).toThrow();
});
