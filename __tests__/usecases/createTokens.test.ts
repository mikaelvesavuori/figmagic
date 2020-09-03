import trash from 'trash';

import { createTokens } from '../../bin/usecases/createTokens';

import { testConfig } from '../../testdata/testConfig';
import { figmaTestResponse } from '../../testdata/figmaTestResponse';

// Re-ordered these (success & failure) because they somehow seem to keep variable names in memory, causing test failures

describe('Success cases', () => {
  test('It should write tokens given a valid configuration, valid data and an output folder', async () => {
    const config = testConfig;
    const data = figmaTestResponse;
    const outputFolderTokens = '__test-tokens-success__';
    // @ts-ignore
    await expect(createTokens(config, data, outputFolderTokens)).resolves.toBe(true);
    trash(outputFolderTokens);
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
    const outputFolderTokens = '__test-tokens-fail__';
    await expect(
      // @ts-ignore
      createTokens(config, data, outputFolderTokens)
    ).rejects.toThrowError();
    trash(outputFolderTokens);
  });
});
