import trash from 'trash';

import { createTokens } from '../../bin/usecases/createTokens';

import { testConfig } from '../../testdata/testConfig';
import { figmaTestResponse } from '../../testdata/figmaTestResponse';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(createTokens()).rejects.toThrowError();
  });
});

// TODO: This test exits correctly, but probably because of some async/sync issue no tokens get written
describe('Success cases', () => {
  test('It should write tokens given a valid configuration, valid data and an output folder', async () => {
    const config = testConfig;
    const data = figmaTestResponse;
    const outputFolderTokens = '__test-tokens__';
    // @ts-ignore
    await expect(createTokens(config, data, outputFolderTokens)).resolves.toBe(true);
    trash(outputFolderTokens);
  });
});
