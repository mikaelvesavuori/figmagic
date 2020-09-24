import { makeDurationTokens } from '../../../../bin/entities/Token/logic/makeDurationTokens';

import { durationsFrame, durationsFrameInvalid } from '../../../../testdata/frames/durationsFrame';

describe('Failure cases', () => {
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      makeDurationTokens({});
    }).toThrow();
  });

  test('It should throw an error if frame does not have "characters" property', () => {
    expect(() => {
      // @ts-ignore
      makeDurationTokens(durationsFrameInvalid);
    }).toThrow();
  });

  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      makeDurationTokens();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(makeDurationTokens(durationsFrame)).toEqual(
      expect.objectContaining({ long: 0.6, medium: 0.25, short: 0.15, veryLong: 1 })
    );
  });
});
