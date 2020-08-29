import { setupRadiusTokens } from '../bin/entities/Tokens/tokens/setupRadiusTokens';

import { radiiFrame } from '../testdata/frames/radiiFrame';

/*
describe('Failure cases', () => {
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      setupRadiusTokens({});
    }).toThrow();
  });

  test('It should throw an error if frame does not have "cornerRadius" property', () => {
    expect(() => {
      setupRadiusTokens({
        children: [
          {
            somethingElse: 123
          }
        ]
      });
    }).toThrow();
  });

  test('It should throw an error if no parameter is provided', () => {
    expect(() => {
      setupRadiusTokens();
    }).toThrow();
  });
});
*/

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(setupRadiusTokens(radiiFrame, 16)).toEqual(
      expect.objectContaining({ circle: '100px', hard: '0px', rounded: '4px', soft: '8px' })
    );
  });
});
