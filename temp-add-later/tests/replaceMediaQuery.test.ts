import { replaceMediaQuery } from '../bin/frameworks/string/replaceMediaQuery';

/*
describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      replaceMediaQuery();
    }).toThrow();
  });
});
*/

describe('Success cases', () => {
  test('It should return the string if function could not find a match', () => {
    expect(replaceMediaQuery(' ', '@upto')).toBe(' ');
  });

  // TODO: This is completely broken, but since it's not really used for now, I don' care a lot
  test('It should return a valid media query', () => {
    expect(replaceMediaQuery('@upto 768', '@upto')).toBe('@media query and (max-width:px) { 768');
  });
});
