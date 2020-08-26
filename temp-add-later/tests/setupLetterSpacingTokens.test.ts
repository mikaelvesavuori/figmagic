import { setupLetterSpacingTokens } from '../bin/entities/Tokens/tokens/setupLetterSpacingTokens';

import { letterSpacingsFrame } from '../testdata/letterSpacingsFrame';

/*
describe('Failure cases', () => {
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      setupLetterSpacingTokens({});
    }).toThrow();
  });

  test('It should throw an error if frame does not have "style" property', () => {
    expect(() => {
      setupLetterSpacingTokens({
        children: [
          {
            somethingElse: 123
          }
        ]
      });
    }).toThrow();
  });

  test('It should throw an error if frame does not have "style.fontSize" allowing to convert to em', () => {
    expect(() => {
      setupLetterSpacingTokens({
        name: 'test',
        children: [
          {
            name: 'foo',
            style: {
              letterSpacing: 0
            }
          }
        ]
      });
    }).toThrow();
  });

  test('It should throw an error if no parameter is provided', () => {
    expect(() => {
      setupLetterSpacingTokens();
    }).toThrow();
  });
});
*/

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(setupLetterSpacingTokens(letterSpacingsFrame)).toEqual(
      expect.objectContaining({ regular: '0em', tight: '-0.045em', wide: '0.05em' })
    );
  });
});

test('It should handle a conversion between px and em units', () => {
  const mockedFrame = {
    name: 'test',
    children: [
      {
        name: 'style1',
        style: {
          fontSize: 16,
          letterSpacing: 2
        }
      },
      {
        name: 'style2',
        style: {
          fontSize: 24,
          letterSpacing: 8
        }
      }
    ]
  };
  // Ask for "px" values: should be the value provided by Figma with the unit
  expect(setupLetterSpacingTokens(mockedFrame, 'px')).toEqual(
    expect.objectContaining({
      style1: '2px',
      style2: '8px'
    })
  );
  // Ask for "em" values: should be a converted value based on the relative font-size
  expect(setupLetterSpacingTokens(mockedFrame, 'em')).toEqual(
    expect.objectContaining({
      style1: '0.125em', // 2px out of 16px = 0.125em
      style2: '0.333em' // 8px out of 24px = 0.33em
    })
  );
});

test('It should return 0 if letterSpacing is undefined', () => {
  expect(
    setupLetterSpacingTokens({
      name: 'test',
      children: [
        {
          name: 'foo',
          style: {
            fontSize: 16
          }
        }
      ]
    })
  ).toEqual(
    expect.objectContaining({
      foo: '0em'
    })
  );
});
