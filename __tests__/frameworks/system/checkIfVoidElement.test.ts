import { checkIfVoidElement } from '../../../bin/frameworks/system/checkIfVoidElement';

describe('Success cases', () => {
  test('It should return true if it receives nothing', () => {
    expect(checkIfVoidElement('')).toBe(false);
  });

  test('It should return false if it receives a non-"void element"', () => {
    expect(checkIfVoidElement('div')).toBe(false);
  });

  test('It should return true if it receives a "void element"', () => {
    expect(checkIfVoidElement('input')).toBe(true);
  });
});
