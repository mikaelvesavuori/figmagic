import { createConfiguration } from '../bin/functions/createConfiguration';

/*
test('It should throw an error when missing user configuration path', () => {
  expect(() => {
    createConfiguration();
  }).toThrow();
});
*/

test('asdf', () => {
  const CLI_ARGS = ['-t', 'asdf1234'];
  expect(createConfiguration(`${process.cwd}/.figmagicrc`, ...CLI_ARGS)).toBe('asdf');
});

/*
test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    camelize();
  }).toThrow();
});
*/
