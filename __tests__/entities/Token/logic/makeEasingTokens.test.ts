import { makeEasingTokens } from '../../../../bin/entities/Token/logic/makeEasingTokens';

import { easingFrame, easingFrameInvalid } from '../../../../testdata/frames/easingFrame';

describe('Failure cases', () => {
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      makeEasingTokens({});
    }).toThrow();
  });

  test('It should throw an error if frame does not have "characters" property', () => {
    expect(() => {
      // @ts-ignore
      makeEasingTokens(easingFrameInvalid);
    }).toThrow();
  });

  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      makeEasingTokens();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(makeEasingTokens(easingFrame)).toEqual(
      expect.objectContaining({
        easeIn: 'cubic-bezier(0.50, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.40, 1)',
        easeInout: 'cubic-bezier(0.45, 0, 0.40, 1)'
      })
    );
  });
});
