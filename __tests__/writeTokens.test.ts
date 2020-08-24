import trash from 'trash';

import { writeTokens } from '../bin/frameworks/filesystem/writeTokens';

import { defaultConfig } from '../bin/entities/Config/defaultConfig';
import { colorFrame } from '../testdata/colorFrame';
import { spacingFrame } from '../testdata/spacingFrame';
import { fontFrame } from '../testdata/fontFrame';
import { fontSizeFrame } from '../testdata/fontSizeFrame';
import { fontWeightFrame } from '../testdata/fontWeightFrame';
import { lineHeightFrame } from '../testdata/lineHeightFrame';
import { borderWidthsFrame } from '../testdata/borderWidthsFrame';
import { letterSpacingsFrame } from '../testdata/letterSpacingsFrame';
import { mediaQueriesFrame } from '../testdata/mediaQueriesFrame';
import { radiiFrame } from '../testdata/radiiFrame';
import { shadowsFrame } from '../testdata/shadowsFrame';
import { zIndicesFrame } from '../testdata/zIndicesFrame';

// Set temp folder
const TEMP_FOLDER = `__tokens__`;
defaultConfig.outputFolderTokens = TEMP_FOLDER;

/*
test('It should throw an error if no parameter is provided', async () => {
  await expect(writeTokens()).rejects.toThrow();
});

test('It should pass the zero-length token check', async () => {
  const TOKENS = [{}, {}];
  await expect(writeTokens(TOKENS)).rejects.toThrow();
});

test('It should fail the zero-length token check', async () => {
  const TOKENS = [];
  await expect(writeTokens(TOKENS)).rejects.toThrow();
});
*/

test('It should return tokens if passed a valid set of frame and settings', async () => {
  const TOKENS = [
    colorFrame,
    spacingFrame,
    fontFrame,
    fontSizeFrame,
    fontWeightFrame,
    lineHeightFrame,
    borderWidthsFrame,
    letterSpacingsFrame,
    mediaQueriesFrame,
    radiiFrame,
    shadowsFrame,
    zIndicesFrame
  ];

  await expect(writeTokens(TOKENS, defaultConfig)).resolves.toBe(true);
  await trash(TEMP_FOLDER);
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
