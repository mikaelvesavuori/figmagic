import trash from 'trash';

import { writeTokens } from '../../bin/frameworks/filesystem/writeTokens';

import { baseConfig } from '../../bin/entities/Config/baseConfig';
import { colorFrame } from '../../testdata/frames/colorFrame';
import { spacingFrame } from '../../testdata/frames/spacingFrame';
import { fontFrame } from '../../testdata/frames/fontFrame';
import { fontSizeFrame } from '../../testdata/frames/fontSizeFrame';
import { fontWeightFrame } from '../../testdata/frames/fontWeightFrame';
import { lineHeightFrame } from '../../testdata/frames/lineHeightFrame';
import { borderWidthsFrame } from '../../testdata/frames/borderWidthsFrame';
import { letterSpacingsFrame } from '../../testdata/frames/letterSpacingsFrame';
import { mediaQueriesFrame } from '../../testdata/frames/mediaQueriesFrame';
import { radiiFrame } from '../../testdata/frames/radiiFrame';
import { shadowsFrame } from '../../testdata/frames/shadowsFrame';
import { zIndicesFrame } from '../../testdata/frames/zIndicesFrame';

// Set temp folder
const TEMP_FOLDER = `__tokens__`;
baseConfig.outputFolderTokens = TEMP_FOLDER;

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(writeTokens()).rejects.toThrow();
  });

  test('It should pass the zero-length token check', async () => {
    const TOKENS = [{}, {}];
    // @ts-ignore
    await expect(writeTokens(TOKENS)).rejects.toThrow();
  });

  test('It should fail the zero-length token check', async () => {
    const TOKENS = [];
    // @ts-ignore
    await expect(writeTokens(TOKENS)).rejects.toThrow();
  });
});

describe('Success cases', () => {
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

    await expect(writeTokens(TOKENS, baseConfig)).resolves.toBe(true);
    await trash(TEMP_FOLDER);
  });

  test('It can write to a file if provided input', () => {
    const FILE = '__test-writefile1.txt';
    // @ts-ignore
    writeTokens(JSON.stringify({ something: 1234 }), './', FILE);
    trash('./somefile.txt');
  });

  test('It can write a token to a file if provided input', () => {
    const FILE = '__test-writefile2.txt';
    // @ts-ignore
    writeTokens(JSON.stringify({ something: 1234 }), './', FILE, true);
    trash('./somefile.txt');
  });
});
