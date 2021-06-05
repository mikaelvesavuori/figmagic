import { createRadialGradientString } from '../../../bin/frameworks/string/createRadialGradientString';

import {
  gradientStopsRadialThreeStop,
  gradientStopsRadialFourStop,
  gradientHandlePositionsRadialThreeStop,
  gradientHandlePositionsRadialFourStop
} from '../../../testdata/gradient';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      createRadialGradientString();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should successfully process a three-stop radial gradient', () => {
    expect(
      createRadialGradientString({
        gradientStops: gradientStopsRadialThreeStop,
        gradientHandlePositions: gradientHandlePositionsRadialThreeStop
      })
    ).toBe(
      'radial-gradient(50.0% 50.0% at 50.0% 50.0%, rgba(20, 173, 63, 1) 0%, rgba(67, 2, 252, 0.52) 48%, rgba(20, 173, 63, 0) 100%)'
    );
  });

  test('It should successfully process a bigger four-stop radial gradient', () => {
    expect(
      createRadialGradientString({
        gradientStops: gradientStopsRadialFourStop,
        gradientHandlePositions: gradientHandlePositionsRadialFourStop
      })
    ).toBe(
      'radial-gradient(171.6% 182.0% at 11.5% -26.0%, rgba(163, 191, 217, 1) 0%, rgba(89, 71, 143, 0.51) 28%, rgba(207, 45, 45, 0.52) 69%, rgba(33, 44, 36, 0) 100%)'
    );
  });
});
