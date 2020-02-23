import { writeTokens } from '../bin/functions/writeTokens';

import { defaultSettings } from '../testdata/defaultSettings.mjs';
import { colorFrame } from '../testdata/colorFrame.mjs';
import { spacingFrame } from '../testdata/spacingFrame.mjs';
import { fontFrame } from '../testdata/fontFrame.mjs';
import { fontSizeFrame } from '../testdata/fontSizeFrame.mjs';
import { fontWeightFrame } from '../testdata/fontWeightFrame.mjs';
import { lineHeightFrame } from '../testdata/lineHeightFrame.mjs';

test('It should return tokens if passed a valid set of frame and settings', () => {
  const TOKENS = [
    colorFrame,
    spacingFrame,
    fontFrame,
    fontSizeFrame,
    fontWeightFrame,
    lineHeightFrame
  ];

  console.log('defaultSettings', defaultSettings);

  expect(writeTokens(TOKENS, defaultSettings)).toBe(true);
});

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    writeTokens();
  }).toThrow();
});

test('It should pass the zero-length token check', () => {
  const TOKENS = [{}, {}];
  expect(() => {
    writeTokens(TOKENS);
  }).toThrow();
});

test('It should fail the zero-length token check', () => {
  const TOKENS = [];
  expect(() => {
    writeTokens(TOKENS);
  }).toThrow();
});

/*
test('It can write to a file if provided input', () => {
  const FILE = '__test-writefile1.txt';
  writeTokens(JSON.stringify({ something: 1234 }), './', FILE);
  trash('./somefile.txt');
});

test('It can write a token to a file if provided input', () => {
  const FILE = '__test-writefile2.txt';
  writeTokens(JSON.stringify({ something: 1234 }), './', FILE, true);
  trash('./somefile.txt');
});
*/
