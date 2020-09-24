import { makeZindexTokens } from '../../../../bin/entities/Token/logic/makeZindexTokens';

import {
  zIndicesFrame,
  zIndicesFrameNoCharacters
} from '../../../../testdata/frames/zIndicesFrame';

describe('Failure cases', () => {
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      makeZindexTokens({});
    }).toThrow();
  });

  test('It should throw an error if frame does not have "characters" property', () => {
    expect(() => {
      // @ts-ignore
      makeZindexTokens(zIndicesFrameNoCharacters);
    }).toThrow();
  });

  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      makeZindexTokens();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(makeZindexTokens(zIndicesFrame)).toEqual(
      expect.objectContaining({ focus: 10, high: 1, higher: 2, regular: 0, top: 100 })
    );
  });
});
