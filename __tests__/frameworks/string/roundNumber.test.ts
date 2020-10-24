import { roundNumber } from '../../../bin/frameworks/string/roundNumber';

describe('Success cases', () => {
  test('It should round a long floating point number to a shorter one, capped at 6 decimals if no decimal count is provided', () => {
    expect(roundNumber(0.9283649821712)).toBe(0.928365);
  });

  test('It should round a long floating point number to a shorter one, set to 2 decimals if 2 is provided as a value', () => {
    expect(roundNumber(0.23623423, 2)).toBe(0.24);
  });
});
