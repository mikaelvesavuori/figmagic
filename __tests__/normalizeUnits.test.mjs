import { normalizeUnits } from '../bin/functions/normalizeUnits';

test('It should normalize the unit, given a width, px basis, and a conversion type', () => {
  expect(normalizeUnits(400, 'px', 'rem')).toBe('25rem');
});

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    normalizeUnits();
  }).toThrow();
});
