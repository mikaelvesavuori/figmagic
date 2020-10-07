import { getId } from '../../../bin/frameworks/string/getId';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      getId();
    }).toThrow();
  });
});

describe('Success cases', () => {
  const TEST_1 = '.:disabled__#5199 {';
  const TEST_2 = '.Normal__#5199 {';
  const TEST_3 = '.Warning__#63 {';
  const TEST_4 = '.Warning {';
  const TEST_5 = '.Warning__#d{';
  const TEST_6 = '.Warning__#6325928352mndbm238 {';

  test('It should return 5199 from pseudo-class name', () => {
    expect(getId(TEST_1)).toBe('5199 ');
  });

  test('It should return 5199 from class name', () => {
    expect(getId(TEST_2)).toBe('5199 ');
  });

  test('It should return 63 from class name', () => {
    expect(getId(TEST_3)).toBe('63 ');
  });

  test('It should return null if provided string lacking ID', () => {
    expect(getId(TEST_4)).toBe(null);
  });

  test('It should return null if provided ID but no space between it and the opening brace', () => {
    expect(getId(TEST_5)).toBe(null);
  });

  test('It should return value even if given arbitrarily long names', () => {
    expect(getId(TEST_6)).toBe('6325928352mndbm238 ');
  });
});
