import { setupOpacityTokens } from '../bin/entities/Tokens/tokens/setupOpacityTokens';

import { opacitiesFrame } from '../testdata/opacitiesFrame';

/*
describe('Failure cases', () => {
  test('It should throw an error if no parameter is provided', () => {
    expect(() => {
      setupOpacityTokens();
    }).toThrow();
  });

  test('It should throw an error if children are missing', () => {
    expect(() => {
      setupOpacityTokens({});
    }).toThrow();
  });

  test('It should throw an error if children are missing "name" property', () => {
    expect(() => {
      setupOpacityTokens({
        children: [
          {
            nameMismatch: 'Something',
            styleMismatch: {}
          }
        ]
      });
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object with specific unit when passing in valid input', () => {
    expect(setupOpacityTokens(opacitiesFrame, 'float')).toEqual(
      expect.objectContaining({ opaque: 1, disabled: 0.65, semiOpaque: 0.5, transparent: 0 })
    );
    expect(setupOpacityTokens(opacitiesFrame, 'percent')).toEqual(
      expect.objectContaining({
        opaque: '100%',
        disabled: '65%',
        semiOpaque: '50%',
        transparent: '0%'
      })
    );
  });
});
*/
