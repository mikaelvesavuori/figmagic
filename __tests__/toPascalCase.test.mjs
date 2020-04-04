import { toPascalCase } from '../bin/functions/helpers/toPascalCase';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    toPascalCase();
  }).toThrow();
});

test('It should properly pascal-case a string', () => {
  expect(toPascalCase('Asdf Asdf asdF')).toBe('AsdfAsdfAsdf');
});
