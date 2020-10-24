import { createLinearGradientString } from '../../../bin/frameworks/string/createLinearGradientString';

import { gradientStops, gradientHandlePositions } from '../../../testdata/gradient';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      createLinearGradientString();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should successfully process a three-stop linear gradient', () => {
    expect(
      createLinearGradientString({
        gradientStops,
        gradientHandlePositions
      })
    ).toBe(
      'linear-gradient(180deg, rgba(255, 255, 255, 1) 20%, rgba(43, 83, 144, 0.99) 45%, rgba(1, 10, 23, 0.76) 73%)'
    );
  });
});
