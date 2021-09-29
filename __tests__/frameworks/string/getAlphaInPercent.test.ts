import { getAlphaInPercent } from '../../../bin/frameworks/string/getAlphaInPercent';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      getAlphaInPercent();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should get alpha in percent', () => {
    expect(getAlphaInPercent('rgba(123,52,21,0.51)')).toBe('51%');
  });
});
