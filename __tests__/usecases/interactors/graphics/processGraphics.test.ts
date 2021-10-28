import { Config } from '../../../../bin/contracts/Config';

import { processGraphics } from '../../../../bin/usecases/interactors/graphics/processGraphics';

import { loadEnv } from '../../../../bin/frameworks/system/loadEnv';

import { graphicsPage } from '../../../../testdata/graphicsPage';

loadEnv();

const FIGMA_TOKEN = process.env.IS_MOCK_ENABLED ? 'mocked' : process.env.FIGMA_TOKEN;
const FIGMA_URL = process.env.IS_MOCK_ENABLED ? 'mocked' : process.env.FIGMA_URL;

// Re-ordered success and failure cases because the "normal" order will leak variables or something, causing tests to fail

describe('Success cases', () => {
  test('It should exit correctly after having processed valid input', async () => {
    await expect(
      // @ts-ignore
      processGraphics(graphicsPage, {
        figmaData: 'figma.json',
        figmagicFolder: '.figmagic',
        outputFolderTokens: 'tokens',
        outputFolderGraphics: 'graphics',
        outputFormatGraphics: 'svg',
        outputScaleGraphics: 1,
        token: FIGMA_TOKEN,
        url: FIGMA_URL
      } as Config)
    ).resolves.toEqual(expect.objectContaining({}));
  });
});

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(processGraphics()).rejects.toThrow();
  });

  test('It should throw an error if missing token', async () => {
    const xxx = graphicsPage;
    // @ts-ignore
    xxx[0].children = null;

    await expect(
      // @ts-ignore
      processGraphics(xxx, {
        figmaData: 'figma.json',
        figmagicFolder: '.figmagic',
        outputFolderTokens: 'tokens',
        outputFolderGraphics: 'graphics',
        outputFormatGraphics: 'svg',
        outputScaleGraphics: 1,
        token: null,
        url: FIGMA_URL
      } as Config)
    ).rejects.toThrow();
  });

  test('It should throw an error if missing children in graphics page', async () => {
    const data = graphicsPage;

    // @ts-ignore
    data[0].children = null;

    await expect(
      // @ts-ignore
      processGraphics(data, {
        figmaData: 'figma.json',
        figmagicFolder: '.figmagic',
        outputFolderTokens: 'tokens',
        outputFolderGraphics: 'graphics',
        outputFormatGraphics: 'svg',
        outputScaleGraphics: 1,
        token: FIGMA_TOKEN,
        url: FIGMA_URL
      } as Config)
    ).rejects.toThrow();
  });
});

// 27,36-37
