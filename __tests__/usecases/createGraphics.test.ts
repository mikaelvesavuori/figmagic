import fs from 'fs';
import trash from 'trash';

import { createGraphics } from '../../bin/usecases/createGraphics';

import { loadEnv } from '../../bin/frameworks/system/loadEnv';

import { testConfig } from '../../testdata/testConfig';
import { figmaTestResponse } from '../../testdata/figmaTestResponse';

loadEnv();

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(createGraphics()).rejects.toThrowError();
  });

  test('It should throw an error if misconfigured (missing token and URL)', async () => {
    const CONFIG = testConfig;
    const DATA = figmaTestResponse;
    CONFIG.outputFolderGraphics = '__test-graphics__';
    // @ts-ignore
    await expect(createGraphics(CONFIG, DATA)).rejects.toThrowError();
    await trash(CONFIG.outputFolderGraphics);
  });
});

describe('Success cases', () => {
  test('It should write tokens given a valid configuration, valid data and an output folder', async () => {
    const CONFIG = testConfig;
    // @ts-ignore
    CONFIG.token = process.env.FIGMA_TOKEN;
    // @ts-ignore
    CONFIG.url = process.env.FIGMA_URL;
    const DATA = figmaTestResponse;
    CONFIG.outputFolderGraphics = '__test-graphics-success__';

    // @ts-ignore
    await createGraphics(CONFIG, DATA);
    const FILE_EXISTS = fs.existsSync(CONFIG.outputFolderGraphics);
    expect(FILE_EXISTS).toBeTruthy();
    await trash(CONFIG.outputFolderGraphics);
  });
});
