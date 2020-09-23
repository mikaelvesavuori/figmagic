import { makeRadiusTokens } from '../../../../bin/entities/Token/logic/setupRadiusTokens';

import { radiiFrame, radiiFrameNoCornerRadius } from '../../../../testdata/frames/radiiFrame';

describe('Failure cases', () => {
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      makeRadiusTokens({});
    }).toThrow();
  });

  test('It should throw an error if frame does not have "cornerRadius" property', () => {
    expect(() => {
      // @ts-ignore
      makeRadiusTokens(radiiFrameNoCornerRadius);
    }).toThrow();
  });

  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      makeRadiusTokens();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(makeRadiusTokens(radiiFrame, 16)).toEqual(
      expect.objectContaining({ circle: '100px', hard: '0px', rounded: '4px', soft: '8px' })
    );
  });
});
