import { processElements } from '../bin/functions/process/processElements';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    processElements();
  }).toThrow();
});
