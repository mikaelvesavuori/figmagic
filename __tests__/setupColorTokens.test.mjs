import { setupColorTokens } from '../bin/functions/setupColorTokens';

import { colorFrame } from '../testdata/colorFrame.mjs';

test('something here', () => {
  expect(setupColorTokens(colorFrame)).toBe('25rem');
});

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    setupColorTokens();
  }).toThrow();
});
