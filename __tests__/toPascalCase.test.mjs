import { toPascalCase } from '../bin/functions/toPascalCase';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    toPascalCase();
  }).toThrow();
});
