import { convertHexToRgba } from '../bin/functions/convertHexToRgba';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    convertHexToRgba();
  }).toThrow();
});
