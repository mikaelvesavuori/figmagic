import { convertHexToRgba } from '../bin/functions/helpers/convertHexToRgba';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    convertHexToRgba();
  }).toThrow();
});

test('It should throw an error if missing a single parameter', () => {
  expect(() => {
    convertHexToRgba(1, 1, 1);
  }).toThrow();
});

test('It should correctly return a CSS standard RGBA string', () => {
  expect(convertHexToRgba(0.12, 0.512, 123, 1.0)).toBe(`rgba(31, 131, 255, 1)`);
});

test('It should correctly return a CSS standard RGBA string if passed numbers as strings', () => {
  expect(convertHexToRgba('.51', '.51', '0', '0.5')).toBe(`rgba(130, 130, 0, 0.5)`);
});
