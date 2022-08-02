import trash from 'trash';

import { FigmagicController } from '../../bin/controllers/FigmagicController';

import { testConfig } from '../../testdata/testConfig';
import figmaTestResponse from '../../testdata/figma.json';

describe('Failure cases', () => {
  test('It should throw an error if calling without any arguments', async () => {
    // @ts-ignore
    await expect(() => FigmagicController()).rejects.toThrowError();
  });
});

describe('Success cases', () => {
  test('It should successfully run a full set of operations with local data recompilation', async () => {
    const TEST_FOLDER = `__testing-figmagiccontroller`;
    const PATH = `./${TEST_FOLDER}`;

    testConfig.outputFolderTokens = TEST_FOLDER;
    const RESPONSE = await FigmagicController(testConfig as any, figmaTestResponse);
    expect(RESPONSE).toContain('Figmagic completed operations successfully!');

    await trash(PATH);
  });
});
