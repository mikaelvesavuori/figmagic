//import { BorderWidthTokens } from '../bin/entities/Tokens/Tokens';
import { setupBorderWidthTokens } from '../bin/entities/Tokens/tokens/setupBorderWidthTokens';

import { FRAME as Frame } from '../bin/app/contracts/Figma';

import { borderWidthsFrame } from '../testdata/frames/borderWidthsFrame';

describe('Failure cases', () => {
  /*
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      setupBorderWidthTokens({});
    }).toThrow();
  });

  test('It should throw an error if frame does not have "strokeWidth" property', () => {
    expect(() => {
      setupBorderWidthTokens({
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
      setupBorderWidthTokens();
    }).toThrow();
  });
  */
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(setupBorderWidthTokens(borderWidthsFrame as Frame)).toEqual(
      expect.objectContaining({ chunky: '8px', fat: '4px', hairline: '1px', regular: '2px' })
    );
  });
});
