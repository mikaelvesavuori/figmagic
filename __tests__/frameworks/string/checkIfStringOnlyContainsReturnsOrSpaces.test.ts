import { checkIfStringOnlyContainsReturnsOrSpaces } from '../../../bin/frameworks/string/checkIfStringOnlyContainsReturnsOrSpaces';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      checkIfStringOnlyContainsReturnsOrSpaces();
    }).toThrow();
  });
});

describe('Success cases', () => {
  const TEST_1 = '\n';
  const TEST_2 = '\n\n';
  const TEST_3 = '\n\n\n';
  const TEST_4 = '\n\n \n';
  const TEST_5 = '\n\n \n .classname {';
  const TEST_6 = ' ';

  test('It should return true for single return', () => {
    expect(checkIfStringOnlyContainsReturnsOrSpaces(TEST_1)).toBe(true);
  });

  test('It should return true for double returns', () => {
    expect(checkIfStringOnlyContainsReturnsOrSpaces(TEST_2)).toBe(true);
  });

  test('It should return true for triple returns', () => {
    expect(checkIfStringOnlyContainsReturnsOrSpaces(TEST_3)).toBe(true);
  });

  test('It should return false for returns with spaces', () => {
    expect(checkIfStringOnlyContainsReturnsOrSpaces(TEST_4)).toBe(false);
  });

  test('It should return true for returns with class names', () => {
    expect(checkIfStringOnlyContainsReturnsOrSpaces(TEST_5)).toBe(false);
  });

  test('It should return true for single space', () => {
    expect(checkIfStringOnlyContainsReturnsOrSpaces(TEST_6)).toBe(true);
  });
});
