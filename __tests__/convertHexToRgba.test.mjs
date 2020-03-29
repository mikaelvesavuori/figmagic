import { convertHexToRgba } from '../bin/functions/helpers/convertHexToRgba';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    convertHexToRgba();
  }).toThrow();
});
