import { makeOpacityTokens } from '../../../../bin/entities/Token/logic/makeOpacityTokens';

import { opacitiesFrame, opacitiesFrameNoName } from '../../../../testdata/frames/opacitiesFrame';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      makeOpacityTokens();
    }).toThrow();
  });

  test('It should throw an error if children are missing', () => {
    expect(() => {
      // @ts-ignore
      makeOpacityTokens({});
    }).toThrow();
  });

  test('It should throw an error if children are missing "name" property', () => {
    expect(() => {
      // @ts-ignore
      makeOpacityTokens(opacitiesFrameNoName);
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return values using float numbers', () => {
    expect(makeOpacityTokens(opacitiesFrame, 'float')).toEqual(
      expect.objectContaining({ opaque: 1, disabled: 0.65, semiOpaque: 0.5, transparent: 0 })
    );
  });

  test('It should return values using percentages', () => {
    expect(makeOpacityTokens(opacitiesFrame, 'percent')).toEqual(
      expect.objectContaining({
        opaque: '100%',
        disabled: '65%',
        semiOpaque: '50%',
        transparent: '0%'
      })
    );
  });
});
