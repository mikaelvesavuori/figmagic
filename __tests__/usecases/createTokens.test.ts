import trash from 'trash';
import fs from 'fs';

import { createTokens } from '../../bin/usecases/createTokens';

import { testConfig } from '../../testdata/testConfig';
import figmaTestResponse from '../../testdata/figma.json';

// Re-ordered these (success & failure) because they somehow seem to keep variable names in memory, causing test failures

describe('Success cases', () => {
  test('It should write tokens given a valid configuration, valid data and an output folder', async () => {
    const CONFIG = testConfig;
    const DATA = figmaTestResponse;
    CONFIG.outputFolderTokens = '__test-tokens-success__';
    // @ts-ignore
    await createTokens(CONFIG, DATA);
    const FILE_EXISTS = fs.existsSync(CONFIG.outputFolderTokens);
    expect(FILE_EXISTS).toBe(true);
    trash(CONFIG.outputFolderTokens);
  });
});

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(createTokens()).rejects.toThrowError();
  });

  test('It should throw an error if misconfigured (no children in data)', async () => {
    const CONFIG = testConfig;
    const DATA = { ...figmaTestResponse };
    DATA.document.children = [];
    CONFIG.outputFolderTokens = '__test-tokens-fail__';
    await expect(
      // @ts-ignore
      createTokens(CONFIG, DATA)
    ).rejects.toThrowError();
    await trash(CONFIG.outputFolderTokens);
  });
});
