import { makeShadowTokens } from '../../../../bin/entities/Token/logic/makeShadowTokens';

import {
  shadowsFrame,
  shadowsFrameMultipleShadows,
  shadowsFrameNoEffects
} from '../../../../testdata/frames/shadowsFrame';

describe('Failure cases', () => {
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      makeShadowTokens({});
    }).toThrow();
  });

  test('It should throw an error if frame does not have "effects" array', () => {
    expect(() => {
      // @ts-ignore
      makeShadowTokens(shadowsFrameNoEffects);
    }).toThrow();
  });

  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      makeShadowTokens();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input, using "px" conversion', () => {
    expect(makeShadowTokens(shadowsFrame, 'px', 16)).toEqual(
      expect.objectContaining({
        deep: '3px 3px 3px rgba(196, 196, 196, 0.75)',
        medium: '0px 0px 5px rgba(0, 0, 0, 0.5)',
        soft: '0px 0px 5px rgba(196, 196, 196, 1)'
      })
    );
  });

  test('It should return a complete object when passing in valid input, using "rem" conversion', () => {
    expect(makeShadowTokens(shadowsFrame, 'rem', 16)).toEqual(
      expect.objectContaining({
        deep: '0.1875rem 0.1875rem 0.1875rem rgba(196, 196, 196, 0.75)',
        deepMulti:
          '0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.17), 0rem 0.25rem 1.25rem rgba(0, 0, 0, 0.1)',
        medium: '0rem 0rem 0.3125rem rgba(0, 0, 0, 0.5)',
        soft: '0rem 0rem 0.3125rem rgba(196, 196, 196, 1)'
      })
    );
  });

  test('It should return a complete object when passing in valid input, using "em" conversion', () => {
    expect(makeShadowTokens(shadowsFrame, 'em', 16)).toEqual(
      expect.objectContaining({
        deep: '0.1875em 0.1875em 0.1875em rgba(196, 196, 196, 0.75)',
        deepMulti: '0em 0.25em 0.25em rgba(0, 0, 0, 0.17), 0em 0.25em 1.25em rgba(0, 0, 0, 0.1)',
        medium: '0em 0em 0.3125em rgba(0, 0, 0, 0.5)',
        soft: '0em 0em 0.3125em rgba(196, 196, 196, 1)'
      })
    );
  });

  test('It should combine multiple shadows into same key', () => {
    expect(makeShadowTokens(shadowsFrameMultipleShadows, 'px', 16)).toEqual(
      expect.objectContaining({
        deep: '3px 3px 3px rgba(196, 196, 196, 0.75), 3px 3px 3px rgba(196, 196, 196, 0.75)'
      })
    );
  });
});
