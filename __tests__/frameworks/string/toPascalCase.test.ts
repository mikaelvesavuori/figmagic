import { toPascalCase } from '../../../bin/frameworks/string/toPascalCase';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      toPascalCase();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should properly pascal-case a string', () => {
    expect(toPascalCase('Asdf Asdf asdF')).toBe('AsdfAsdfAsdf');
  });
});
