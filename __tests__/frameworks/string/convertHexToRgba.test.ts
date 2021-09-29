import { convertHexToRgba } from '../../../bin/frameworks/string/convertHexToRgba';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      convertHexToRgba();
    }).toThrow();
  });

  test('It should throw an error if missing a single parameter', () => {
    expect(() => {
      // @ts-ignore
      convertHexToRgba(1, 1, 1);
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should correctly return a CSS standard RGBA string', () => {
    expect(convertHexToRgba('#33ff00')).toBe(`rgba(51, 255, 0, 1)`);
  });
});
