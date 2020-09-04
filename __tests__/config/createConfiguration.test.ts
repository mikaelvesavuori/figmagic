import * as path from 'path';

import { createConfiguration } from '../../bin/entities/Config/createConfiguration';
import { baseConfig } from '../../bin/entities/Config/baseConfig';
import { Config } from '../../bin/contracts/Config';

describe('Success cases', () => {
  test('It should return a valid merged configuration if given a path to an RC file and a set of CLI arguments', async () => {
    const USER_CONFIG_PATH = path.join(process.cwd(), 'testdata', 'figmagicrc');
    const CLI_ARGS = ['-t', 'asdf1234'];

    expect(await createConfiguration(baseConfig, USER_CONFIG_PATH, ...CLI_ARGS)).toEqual(
      expect.objectContaining({
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
        testMode: false,
        token: 'asdf1234',
        url: '',
        usePostscriptFontNames: false
      })
    );
  });

  test('It should throw an error when missing user configuration path', async () => {
    // @ts-ignore
    await expect(createConfiguration()).rejects.toThrow();
  });

  test('It logs the configuration when debug mode is enabled', async () => {
    const USER_CONFIG_PATH = path.join(process.cwd(), 'testdata', 'figmagicrc');
    // mock console.log to reduce the noise in the terminal
    const mocks = [jest.spyOn(global.console, 'log').mockImplementation()];

    const configuration = await createConfiguration({} as Config, USER_CONFIG_PATH, ...['--debug']);

    expect(global.console.log).toHaveBeenCalledWith(configuration);

    mocks.forEach((spy) => spy.mockRestore());
  });
});
