import trash from 'trash';
import * as fs from 'fs';

import { createTokens } from '../../bin/usecases/createTokens';

import { testConfig } from '../../testdata/testConfig';
import { figmaTestResponse } from '../../testdata/figmaTestResponse';

// Re-ordered these (success & failure) because they somehow seem to keep variable names in memory, causing test failures

describe('Success cases', () => {
  test('It should write tokens given a valid configuration, valid data and an output folder', async () => {
    const config = testConfig;
    const data = figmaTestResponse;
    config.outputFolderTokens = '__test-tokens-success__';
    // @ts-ignore
    await createTokens(config, data);
    const FILE_EXISTS = fs.existsSync(config.outputFolderTokens);
    expect(FILE_EXISTS).toBe(true);
    trash(config.outputFolderTokens);
  });
});

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(createTokens()).rejects.toThrowError();
  });

  test('It should throw an error if misconfigured (no children in data)', async () => {
    const config = testConfig;
    const data = { ...figmaTestResponse };
    data.document.children = [];
    config.outputFolderTokens = '__test-tokens-fail__';
    await expect(
      // @ts-ignore
      createTokens(config, data)
    ).rejects.toThrowError();
    trash(config.outputFolderTokens);
  });
});
