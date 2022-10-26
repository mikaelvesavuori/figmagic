import fs from 'fs';
import trash from 'trash';

import { createGraphics } from '../../bin/usecases/createGraphics';

import { loadEnv } from '../../bin/frameworks/system/loadEnv';

import { testConfig } from '../../testdata/testConfig';
import figmaTestResponse from '../../testdata/figma.json';
import { optimizeSVGGraphics } from '../../bin/usecases/interactors/graphics/optimizeSVGGraphics';

loadEnv();

const FIGMA_TOKEN = process.env.IS_MOCK_ENABLED ? 'mocked' : process.env.FIGMA_TOKEN;
const FIGMA_URL = process.env.IS_MOCK_ENABLED ? 'mocked' : process.env.FIGMA_URL;

jest.mock('../../bin/usecases/interactors/graphics/optimizeSVGGraphics', () => ({
  optimizeSVGGraphics: jest.fn()
}));

afterEach(() => {
  jest.resetAllMocks();
});

describe('createGraphics test', () => {
  const DATA = figmaTestResponse;

  describe('Failure cases', () => {
    test('It should throw an error if no argument is provided', async () => {
      // @ts-ignore
      await expect(createGraphics()).rejects.toThrowError();
    });

    test('It should throw an error if misconfigured (missing token and URL)', async () => {
      const CONFIG = { ...testConfig, outputFolderGraphics: '__test-graphics__' };
      // @ts-ignore
      await expect(createGraphics(CONFIG, DATA)).rejects.toThrowError();
      await trash(CONFIG.outputFolderGraphics);
    });
  });

  describe('Success cases', () => {
    const CONFIG = {
      ...testConfig,
      token: FIGMA_TOKEN,
      url: FIGMA_URL,
      outputFolderGraphics: '__test-graphics-success__'
    };

    test('It should write tokens given a valid configuration, valid data and an output folder', async () => {
      // @ts-ignore
      await createGraphics(CONFIG, DATA);
      const FILE_EXISTS = fs.existsSync(CONFIG.outputFolderGraphics);
      expect(FILE_EXISTS).toBeTruthy();

      await trash(CONFIG.outputFolderGraphics);
      expect(optimizeSVGGraphics).toHaveBeenCalled();
    });
    test('It should not call optimizeSVGGraphics() if output format is not SVG', async () => {
      CONFIG.outputFormatGraphics = 'png';

      // @ts-ignore
      await createGraphics(CONFIG, DATA);
      const FILE_EXISTS = fs.existsSync(CONFIG.outputFolderGraphics);
      expect(FILE_EXISTS).toBeTruthy();
      await trash(CONFIG.outputFolderGraphics);
      expect(optimizeSVGGraphics).not.toHaveBeenCalled();
    });
  });
});
