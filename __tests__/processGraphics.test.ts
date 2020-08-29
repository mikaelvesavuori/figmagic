import dotenv from 'dotenv';

import { Config } from '../bin/entities/Config/Config';
import { FRAME as Frame } from '../bin/app/contracts/Figma';

import { processGraphics } from '../bin/app/process/processGraphics';

import { getFromApi } from '../bin/frameworks/network/getFromApi';

import { graphicsFrame } from '../testdata/frames/graphicsFrame';

//import { getIds } from '../bin/app/process/graphics/getIds';
//import { getIdString } from '../bin/app/process/graphics/getIdString';
//import { getFileList } from '../bin/app/process/graphics/getFileList';

dotenv.config();

describe('Failure cases', () => {
  /*
  test('It should throw an error if no parameter is provided', async () => {
    await expect(processGraphics()).rejects.toThrow();
  });

  test('It should throw when missing arguments', () => {
    expect(() => getFileList()).toThrow();
  });

  test('It should throw when missing argument', () => {
    expect(() => getIds()).toThrow();
  });

  test('It should throw when missing items in argument', () => {
    expect(() => getIds({})).toThrow();
  });

  test('It should throw when missing ids', () => {
    expect(() => getIdString()).toThrow();
  });
  */

  test('It should throw an error when receiving invalid token and/or URL', async () => {
    expect(await getFromApi('asdf', 'asdf')).toEqual(
      expect.objectContaining({ err: 'Invalid token', status: 403 })
    );
  });
});

describe('Success cases', () => {
  test('It should exit correctly after having processed valid input', async () => {
    await expect(
      processGraphics(
        (graphicsFrame as unknown) as Frame[],
        {
          outputFileName: 'figma.json',
          outputFolderBaseFile: '.figmagic',
          outputFolderTokens: 'tokens',
          outputFolderGraphics: 'graphics',
          outputFormatGraphics: 'svg',
          outputScaleGraphics: 1,
          token: process.env.FIGMA_TOKEN,
          url: process.env.FIGMA_URL
        } as Config
      )
    ).resolves.toEqual(expect.objectContaining({}));
  });

  test('It should find valid data (assuming the base document ID to be "0:0") when passed valid token and URL', async () => {
    const DATA = await getFromApi(process.env.FIGMA_TOKEN, process.env.FIGMA_URL);
    expect(DATA.document.id).toEqual('0:0');
  });
});
