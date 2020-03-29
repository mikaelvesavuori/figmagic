import { createImportStringFromList } from '../bin/functions/helpers/createImportStringFromList';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    createImportStringFromList();
  }).toThrow();
});
