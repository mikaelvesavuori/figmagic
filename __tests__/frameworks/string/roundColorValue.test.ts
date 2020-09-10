import { roundColorValue } from '../../../bin/frameworks/string/roundColorValue';

describe('Failure cases', () => {
  test('It should throw an error when scale is below 0', () => {
    expect(() => {
      roundColorValue(1.0, -1);
    }).toThrow();
  });

  test('It should throw an error when scale is above 255', () => {
    expect(() => {
      roundColorValue(1.0, 256);
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a value based on the two defaults for "quantity" and "scale"', () => {
    expect(roundColorValue()).toBe(0);
  });

  test('It should set a negative "quantity" to 0 and return a value based on the two defaults for "quantity" and "scale"', () => {
    expect(roundColorValue(-4.2)).toBe(0);
  });

  test('It should round a color value into a single decimal', () => {
    expect(roundColorValue(0.5176470875740051, 255)).toBe(132);
  });

  test('It should set full "quantity" value (1.0) to be 255', () => {
    expect(roundColorValue(1.0, 255)).toBe(255);
  });

  test('It should set scale to 255 if user does not provide value', () => {
    expect(roundColorValue(1.0)).toBe(255);
  });

  test('It should max out "quantity" at 1.0, returning at most a full value of 255', () => {
    expect(roundColorValue(12412.1)).toBe(255);
  });

  test('It should set an alpha/opacity value into a cleaned value, fixed to 2 decimals', () => {
    expect(roundColorValue(0.33000001311302185, 1)).toBe(0.33);
  });
});
