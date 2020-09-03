import * as fs from 'fs';
import trash from 'trash';
import dotenv from 'dotenv';

import { createGraphics } from '../../bin/usecases/createGraphics';

import { testConfig } from '../../testdata/testConfig';
import { figmaTestResponse } from '../../testdata/figmaTestResponse';

dotenv.config();

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(createGraphics()).rejects.toThrowError();
  });

  test('It should throw an error if misconfigured (missing token and URL)', async () => {
    const config = testConfig;
    const data = figmaTestResponse;
    const outputFolderGraphics = '__test-graphics__';
    // @ts-ignore
    await expect(createGraphics(config, data, outputFolderGraphics)).rejects.toThrowError();
    trash(outputFolderGraphics);
  });
});

describe('Success cases', () => {
  test('It should write tokens given a valid configuration, valid data and an output folder', async () => {
    const config = testConfig;
    config.token = process.env.FIGMA_TOKEN;
    config.url = process.env.FIGMA_URL;
    const data = figmaTestResponse;
    const outputFolderGraphics = '__test-graphics-success__';
    // @ts-ignore
    await createGraphics(config, data, outputFolderGraphics);
    const fileExists = fs.existsSync(outputFolderGraphics);
    expect(fileExists).toBeTruthy();
    trash(outputFolderGraphics);
  });
});
