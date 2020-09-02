import { replaceMediaQuery } from '../../bin/frameworks/string/replaceMediaQuery';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(() => replaceMediaQuery()).toThrow();
  });
});

describe('Success cases', () => {
  test('It should asd', () => {
    expect(replaceMediaQuery('@upto 500px', 'xxx')).toBe('asdf');
  });

  test('It should asd', () => {
    expect(replaceMediaQuery('@upto', '500px')).toBe('asdf');
  });
});
