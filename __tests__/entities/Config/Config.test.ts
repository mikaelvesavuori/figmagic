import * as path from 'path';

import { Configuration } from '../../../bin/entities/Config/index';

describe('Failure cases', () => {
  test('It should throw an error if called without a user config path', async () => {
    const CLI_ARGS: any[] = [];
    const USER_CONFIG_PATH = '';
    const CONFIGURATION = new Configuration(USER_CONFIG_PATH, ...CLI_ARGS);

    await expect(CONFIGURATION.createConfig()).rejects.toThrowError();
  });
});

describe('Success cases', () => {
  test('It should return a complete, default configuration when passing in valid user config path, but no CLI arguments input', async () => {
    const CLI_ARGS: any[] = [];
    const USER_CONFIG_PATH = path.join(`${process.cwd()}`, `testdata`, `figmagicrc`);
    const CONFIGURATION = new Configuration(USER_CONFIG_PATH, ...CLI_ARGS);

    await expect(CONFIGURATION.createConfig()).resolves.toMatchObject({
      debugMode: false,
      fontUnit: 'rem',
      letterSpacingUnit: 'em',
      opacitiesUnit: 'float',
      outputFileName: 'figma.json',
      outputFolderBaseFile: '.figmagic',
      outputFolderElements: 'elements',
      outputFolderGraphics: 'graphics',
      outputFolderTokens: 'tokens',
      outputFormatGraphics: 'svg',
      outputScaleGraphics: 1,
      outputTokenDataType: null,
      outputTokenFormat: 'mjs',
      recompileLocal: false,
      remSize: 16,
      skipFileGeneration: {
        forceUpdate: true,
        skipCss: false,
        skipDescription: false,
        skipReact: false,
        skipStorybook: false,
        skipStyled: false
      },
      spacingUnit: 'rem',
      syncElements: false,
      syncGraphics: false,
      templates: {
        templatePathReact: 'templates/react.jsx',
        templatePathStorybook: 'templates/story.js',
        templatePathStyled: 'templates/styled.jsx'
      },
      token: '',
      url: '',
      usePostscriptFontNames: false
    });
  });

  test('It should return a complete, custom configuration when passing in valid user config path, and some CLI arguments input', async () => {
    const CLI_ARGS: any[] = ['--debug', '--skipStorybook', '-t', 'some-RANDOM-t0k3n'];
    const USER_CONFIG_PATH = path.join(`${process.cwd()}`, `testdata`, `figmagicrc`);
    const CONFIGURATION = new Configuration(USER_CONFIG_PATH, ...CLI_ARGS);

    await expect(CONFIGURATION.createConfig()).resolves.toMatchObject({
      debugMode: true,
      fontUnit: 'rem',
      letterSpacingUnit: 'em',
      opacitiesUnit: 'float',
      outputFileName: 'figma.json',
      outputFolderBaseFile: '.figmagic',
      outputFolderElements: 'elements',
      outputFolderGraphics: 'graphics',
      outputFolderTokens: 'tokens',
      outputFormatGraphics: 'svg',
      outputScaleGraphics: 1,
      outputTokenDataType: null,
      outputTokenFormat: 'mjs',
      recompileLocal: false,
      remSize: 16,
      skipFileGeneration: {
        forceUpdate: true,
        skipCss: false,
        skipDescription: false,
        skipReact: false,
        skipStorybook: true,
        skipStyled: false
      },
      spacingUnit: 'rem',
      syncElements: false,
      syncGraphics: false,
      templates: {
        templatePathReact: 'templates/react.jsx',
        templatePathStorybook: 'templates/story.js',
        templatePathStyled: 'templates/styled.jsx'
      },
      token: 'some-RANDOM-t0k3n',
      url: '',
      usePostscriptFontNames: false
    });
  });
});
