import dotenv from 'dotenv';

import { processGraphics } from '../bin/functions/process/processGraphics';

import { graphicsFrame } from '../testdata/graphicsFrame.mjs';

dotenv.config();

test('It should throw an error if no parameter is provided', async () => {
  await expect(processGraphics()).rejects.toThrow();
});

test('It should exit correctly after having processed valid input', async () => {
  await expect(
    processGraphics(graphicsFrame.children, {
      outputFileName: 'figma.json',
      outputFolderBaseFile: '.figmagic',
      outputFolderTokens: 'tokens',
      outputFolderGraphics: 'graphics',
      outputFormatGraphics: 'svg',
      outputScaleGraphics: 1,
      token: process.env.FIGMA_TOKEN,
      url: process.env.FIGMA_URL
    })
  ).resolves.toEqual(expect.objectContaining({}));
});

/*

test('It should throw an error when receiving invalid token and/or URL', async () => {
  expect(await getFromApi('asdf', 'asdf')).toEqual(
    expect.objectContaining({ err: 'Invalid token', status: 403 })
  );
});

test('It should find valid data (assuming the base document ID to be "0:0") when passed valid token and URL', async () => {
  const DATA = await getFromApi(process.env.FIGMA_TOKEN, process.env.FIGMA_URL);
  expect(DATA.document.id).toEqual('0:0');
});
*/
