import { makeRadiusTokens } from '../../../../bin/entities/Token/logic/makeRadiusTokens';

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
  test('It should return a complete object when passing in valid input, using "px" values', () => {
    expect(makeRadiusTokens(radiiFrame, 'px', 16)).toEqual(
      expect.objectContaining({ circle: '100px', hard: '0px', rounded: '4px', soft: '8px' })
    );
  });

  test('It should return a complete object when passing in valid input, using "rem" values', () => {
    expect(makeRadiusTokens(radiiFrame, 'rem', 16)).toEqual(
      expect.objectContaining({
        circle: '6.25rem',
        hard: '0rem',
        rounded: '0.25rem',
        soft: '0.5rem'
      })
    );
  });

  test('It should return a complete object when passing in valid input, using "em" values', () => {
    expect(makeRadiusTokens(radiiFrame, 'em', 16)).toEqual(
      expect.objectContaining({ circle: '6.25em', hard: '0em', rounded: '0.25em', soft: '0.5em' })
    );
  });
});
