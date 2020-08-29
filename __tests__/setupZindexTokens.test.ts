import { setupZindexTokens } from '../bin/entities/Tokens/tokens/setupZindexTokens';

import { zIndicesFrame, zIndicesFrameNoCharacters } from '../testdata/frames/zIndicesFrame';

describe('Failure cases', () => {
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      setupZindexTokens({});
    }).toThrow();
  });

  test('It should throw an error if frame does not have "characters" property', () => {
    expect(() => {
      // @ts-ignore
      setupZindexTokens(zIndicesFrameNoCharacters);
    }).toThrow();
  });

  test('It should throw an error if no parameter is provided', () => {
    expect(() => {
      // @ts-ignore
      setupZindexTokens();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(setupZindexTokens(zIndicesFrame)).toEqual(
      expect.objectContaining({ focus: 10, high: 1, higher: 2, regular: 0, top: 100 })
    );
  });
});
