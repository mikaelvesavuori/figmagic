//import trash from 'trash';

import { createGraphics } from '../../bin/usecases/createGraphics';

//import { testConfig } from '../../testdata/testConfig';
//import { figmaTestResponse } from '../../testdata/figmaTestResponse';

// TODO: Test loc 21

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(createGraphics()).rejects.toThrowError();
  });
});

/*
describe('Success cases', () => {
  test('It should write tokens given a valid configuration, valid data and an output folder', async () => {
    const config = testConfig;
    const data = figmaTestResponse;
    const outputFolderTokens = '__test-tokens__';
    // @ts-ignore
    await expect(createGraphics(config, data, outputFolderTokens)).resolves.toBe(true);
    trash(outputFolderTokens);
  });
});
*/
