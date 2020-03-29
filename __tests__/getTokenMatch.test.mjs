import { getTokenMatch } from '../bin/functions/process/getTokenMatch';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    getTokenMatch();
  }).toThrow();
});
