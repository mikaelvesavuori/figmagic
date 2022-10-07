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
  test('It should return a complete object when passing in valid input, using "s" conversion', () => {
    expect(makeDurationTokens(durationsFrame, 's')).toEqual(
      expect.objectContaining({ long: '0.6s', medium: '0.25s', short: '0.15s', veryLong: '1s' })
    );
  });

  test('It should return a complete object when passing in valid input, using "ms" conversion', () => {
    expect(makeDurationTokens(durationsFrame, 'ms')).toEqual(
      expect.objectContaining({ long: '0.6ms', medium: '0.25ms', short: '0.15ms', veryLong: '1ms' })
    );
  });
});
