import { findShortenedNameMatch } from '../bin/frameworks/string/findShortenedNameMatch';

describe('Failure cases', () => {
  test('It should throw error when running nothing in the first argument, and then something in the second one', () => {
    expect(() => {
      findShortenedNameMatch(null, 'something');
    }).toThrow();
  });

  /*
  test('It should throw error when running without arguments', () => {
    expect(() => {
      findShortenedNameMatch();
    }).toThrow();
  });

  test('It should throw error when running only with first argument', () => {
    expect(() => {
      findShortenedNameMatch('something');
    }).toThrow();
  });

  test('It should throw error when encountering non-string values', () => {
    expect(() => {
      findShortenedNameMatch(123, {});
    }).toThrow();
  });
*/
});

describe('Success cases', () => {});
