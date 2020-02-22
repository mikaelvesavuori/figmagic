import { createFolder } from '../bin/functions/createFolder';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    createFolder();
  }).toThrow();
});
