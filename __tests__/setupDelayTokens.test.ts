import { setupDelayTokens } from '../bin/entities/Tokens/tokens/setupDelayTokens';

import { delayFrame, delayFrameInvalid } from '../testdata/frames/delaysFrame';

describe('Failure cases', () => {
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      setupDelayTokens({});
    }).toThrow();
  });

  test('It should throw an error if frame does not have "characters" property', () => {
    expect(() => {
      // @ts-ignore
      setupDelayTokens(delayFrameInvalid);
    }).toThrow();
  });

  test('It should throw an error if no parameter is provided', () => {
    expect(() => {
      // @ts-ignore
      setupDelayTokens();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(setupDelayTokens(delayFrame)).toEqual(
      expect.objectContaining({
        decimal: 0.5,
        fast: 200,
        medium: 400,
        slow: 750
      })
    );
  });
});
