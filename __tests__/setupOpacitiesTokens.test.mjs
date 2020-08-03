import { setupOpacitiesTokens } from '../bin/functions/tokens/setupOpacitiesTokens';

import { opacitiesFrame } from '../testdata/opacitiesFrame';

test('It should return a complete object with specific unit when passing in valid input', () => {
  expect(setupOpacitiesTokens(opacitiesFrame, 'float')).toEqual(
    expect.objectContaining({ opaque: 1, disabled: 0.65, semiOpaque: 0.5, transparent: 0 })
  );
  expect(setupOpacitiesTokens(opacitiesFrame, 'percent')).toEqual(
    expect.objectContaining({
      opaque: '100%',
      disabled: '65%',
      semiOpaque: '50%',
      transparent: '0%'
    })
  );
});

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    setupOpacitiesTokens();
  }).toThrow();
});

test('It should throw an error if children are missing', () => {
  expect(() => {
    setupOpacitiesTokens({});
  }).toThrow();
});

test('It should throw an error if children are missing "name" property', () => {
  expect(() => {
    setupOpacitiesTokens({
      children: [
        {
          nameMismatch: 'Something',
          styleMismatch: {}
        }
      ]
    });
  }).toThrow();
});
