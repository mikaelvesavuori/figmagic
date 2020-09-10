import dotenv from 'dotenv';

import { Config } from '../../../../bin/contracts/Config';

import { processGraphics } from '../../../../bin/usecases/interactors/graphics/processGraphics';

import { graphicsPage } from '../../../../testdata/graphicsPage';

dotenv.config();

// Re-ordered success and failure cases because the "normal" order will leak variables or something, causing tests to fail

describe('Success cases', () => {
  test('It should exit correctly after having processed valid input', async () => {
    await expect(
      // @ts-ignore
      processGraphics(graphicsPage, {
        outputFileName: 'figma.json',
        outputFolderBaseFile: '.figmagic',
        outputFolderTokens: 'tokens',
        outputFolderGraphics: 'graphics',
        outputFormatGraphics: 'svg',
        outputScaleGraphics: 1,
        token: process.env.FIGMA_TOKEN,
        url: process.env.FIGMA_URL
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
    xxx[0].children = null;

    await expect(
      // @ts-ignore
      processGraphics(xxx, {
        outputFileName: 'figma.json',
        outputFolderBaseFile: '.figmagic',
        outputFolderTokens: 'tokens',
        outputFolderGraphics: 'graphics',
        outputFormatGraphics: 'svg',
        outputScaleGraphics: 1,
        token: null,
        url: process.env.FIGMA_URL
      } as Config)
    ).rejects.toThrow();
  });

  test('It should throw an error if missing children in graphics page', async () => {
    const data = graphicsPage;
    data[0].children = null;

    await expect(
      // @ts-ignore
      processGraphics(data, {
        outputFileName: 'figma.json',
        outputFolderBaseFile: '.figmagic',
        outputFolderTokens: 'tokens',
        outputFolderGraphics: 'graphics',
        outputFormatGraphics: 'svg',
        outputScaleGraphics: 1,
        token: process.env.FIGMA_TOKEN,
        url: process.env.FIGMA_URL
      } as Config)
    ).rejects.toThrow();
  });
});

// 27,36-37
