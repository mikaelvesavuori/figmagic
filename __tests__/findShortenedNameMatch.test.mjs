import { findShortenedNameMatch } from '../bin/functions/helpers/findShortenedNameMatch';

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

test('It should throw error when running nothing in the first argument, and then something in the second one', () => {
  expect(() => {
    findShortenedNameMatch(null, 'something');
  }).toThrow();
});

test('It should throw error when encountering non-string values', () => {
  expect(() => {
    findShortenedNameMatch(123, {});
  }).toThrow();
});
