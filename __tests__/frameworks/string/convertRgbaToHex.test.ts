import { convertRgbaToHex } from '../../../bin/frameworks/string/convertRgbaToHex';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      convertRgbaToHex();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should correctly return a hexadecimal color value from an RGBA color value', () => {
    expect(convertRgbaToHex('rgba(7,75,114,1)')).toBe('#074b72');
  });

  test('It should correctly return a hexadecimal color value from an RGB color value, defaulting to alpha 1', () => {
    expect(convertRgbaToHex('rgba(7,75,114)')).toBe('#074b72');
  });
});
