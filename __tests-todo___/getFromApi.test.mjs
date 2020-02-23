import { getFromApi } from '../bin/functions/getFromApi';
import { config } from '../bin/meta/config.mjs';

test('It should remove single instances of forbidden characters', () => {
  expect(getFromApi('asdf', 'asdf', config.outputFolderBaseFile, config.outputFileName)).toBe(
    'asdf'
  );
});

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    getFromApi();
  }).toThrow();
});
