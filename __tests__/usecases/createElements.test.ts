import fs from 'fs';
import trash from 'trash';

import { createElements } from '../../bin/usecases/createElements';

import { loadEnv } from '../../bin/frameworks/system/loadEnv';

import { testConfig } from '../../testdata/testConfig';
import figmaTestResponse from '../../testdata/figma.json';
import { figmaCompleteCleaned } from '../../testdata/figma-complete-cleaned';

loadEnv();

const FIGMA_TOKEN = process.env.IS_MOCK_ENABLED ? 'mocked' : process.env.FIGMA_TOKEN;
const FIGMA_URL = process.env.IS_MOCK_ENABLED ? 'mocked' : process.env.FIGMA_URL;

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(createElements()).rejects.toThrowError();
  });
});

describe('Success cases', () => {
  test('It should write tokens given a valid configuration, valid data and an output folder', async () => {
    const CONFIG = testConfig;
    CONFIG.token = FIGMA_TOKEN || '';
    CONFIG.url = FIGMA_URL || '';
    CONFIG.outputFolderElements = '__test-elements-success__';
    CONFIG.templates = {
      templatePathGraphic: 'templates/graphic',
      templatePathReact: 'templates/react',
      templatePathStorybook: 'templates/story',
      templatePathStyled: 'templates/styled'
    };
    const DATA = figmaTestResponse;

    // @ts-ignore
    await createElements(CONFIG, DATA);
    const FILE_EXISTS = fs.existsSync(CONFIG.outputFolderElements);
    expect(FILE_EXISTS).toBeTruthy();
    await trash(CONFIG.outputFolderElements);
  });

  test.skip('It should write graphic elements and check that graphic elements map file exists', async () => {
    const CONFIG = testConfig;
    CONFIG.token = FIGMA_TOKEN || '';
    CONFIG.url = FIGMA_URL || '';
    CONFIG.outputFolderElements = '__test-graphic-elements__';
    CONFIG.outputFolderGraphics = 'testdata/svg';
    CONFIG.outputFormatGraphics = 'svg';
    CONFIG.outputFormatElements = 'tsx';
    CONFIG.outputGraphicElements = true;
    CONFIG.outputGraphicElementsMap = true;
    CONFIG.syncTokens = false;
    CONFIG.syncElements = true;
    CONFIG.syncGraphics = true;
    CONFIG.templates.templatePathGraphic = './templates/graphic';
    CONFIG.templates.templatePathReact = './templates/react';
    CONFIG.templates.templatePathStorybook = './templates/story';
    CONFIG.templates.templatePathStyled = './templates/styled';
    const DATA = figmaCompleteCleaned;

    // @ts-ignore
    await createElements(CONFIG, DATA);
    const FILE_EXISTS = fs.existsSync(`${CONFIG.outputFolderElements}/Graphics/index.tsx`);
    expect(FILE_EXISTS).toBeTruthy();
    await trash(CONFIG.outputFolderElements);
  });
});
