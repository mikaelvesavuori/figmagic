import { makeDelayTokens } from '../../../../bin/entities/Token/logic/makeDelayTokens';

import { delayFrame, delayFrameInvalid } from '../../../../testdata/frames/delaysFrame';

describe('Failure cases', () => {
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      makeDelayTokens({});
    }).toThrow();
  });

  test('It should throw an error if frame does not have "characters" property', () => {
    expect(() => {
      // @ts-ignore
      makeDelayTokens(delayFrameInvalid);
    }).toThrow();
  });

  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      makeDelayTokens();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(makeDelayTokens(delayFrame)).toEqual(
      expect.objectContaining({
        decimal: 0.5,
        fast: 200,
        medium: 400,
        slow: 750
      })
    );
  });
});
