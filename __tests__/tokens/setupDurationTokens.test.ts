import { setupDurationTokens } from '../../bin/entities/Token/logic/setupDurationTokens';

import { durationsFrame, durationsFrameInvalid } from '../../testdata/frames/durationsFrame';

describe('Failure cases', () => {
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      setupDurationTokens({});
    }).toThrow();
  });

  test('It should throw an error if frame does not have "characters" property', () => {
    expect(() => {
      // @ts-ignore
      setupDurationTokens(durationsFrameInvalid);
    }).toThrow();
  });

  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      setupDurationTokens();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(setupDurationTokens(durationsFrame)).toEqual(
      expect.objectContaining({ long: 0.6, medium: 0.25, short: 0.15, veryLong: 1 })
    );
  });
});
