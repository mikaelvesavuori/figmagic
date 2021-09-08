import trash from 'trash';
import fs from 'fs';

import { baseConfig } from '../../../../bin/entities/Config/baseConfig';

import { writeTokens } from '../../../../bin/usecases/interactors/tokens/writeTokens';

// Set temp folder
const TEMP_FOLDER = `__writeTokens-test__`;
baseConfig.outputFolderTokens = TEMP_FOLDER;

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(() => writeTokens()).toThrowError();
  });

  test('It should pass the zero-length token check', () => {
    const TOKENS = [{}, {}];
    // @ts-ignore
    expect(() => writeTokens(TOKENS)).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should write tokens (MJS) if passed a valid set of write operations', async () => {
    const TEMP_FILE = `colors_mjs`;
    const TEMP_FOLDER_MJS = `__writeFile-tokens-mjs-success__`;

    const TOKENS: any = [
      {
        type: 'token',
        file: {
          green3: 'rgba(111, 207, 151, 1)',
          green2: 'rgba(39, 174, 96, 1)',
          green1: 'rgba(33, 150, 83, 1)',
          blue3: 'rgba(86, 204, 242, 1)',
          blue2: 'rgba(45, 156, 219, 1)',
          blue1: 'rgba(47, 128, 237, 1)',
          yellow: 'rgba(242, 201, 76, 1)',
          orange: 'rgba(242, 153, 74, 1)',
          red: 'rgba(235, 87, 87, 1)',
          neon: 'rgba(228, 255, 193, 1)',
          gray5: 'rgba(242, 242, 242, 1)',
          gray4: 'rgba(224, 224, 224, 1)',
          gray3: 'rgba(189, 189, 189, 1)',
          gray2: 'rgba(130, 130, 130, 1)',
          gray1: 'rgba(79, 79, 79, 1)',
          white: 'rgba(255, 255, 255, 1)',
          black: 'rgba(51, 51, 51, 1)'
        },
        path: TEMP_FOLDER_MJS,
        name: TEMP_FILE,
        format: 'mjs'
      }
    ];

    writeTokens(TOKENS);
    const FILE_EXISTS = fs.existsSync(`${TEMP_FOLDER_MJS}/${TEMP_FILE}.mjs`);
    expect(FILE_EXISTS).toBe(true);
    await trash(TEMP_FOLDER_MJS);
  });

  test('It should write tokens (JS) if passed a valid set of write operations', async () => {
    const TEMP_FILE = `colors_js`;
    const TEMP_FOLDER_JS = `__writeFile-tokens-js-success__`;

    const TOKENS: any = [
      {
        type: 'token',
        file: {
          green3: 'rgba(111, 207, 151, 1)',
          green2: 'rgba(39, 174, 96, 1)',
          green1: 'rgba(33, 150, 83, 1)',
          blue3: 'rgba(86, 204, 242, 1)',
          blue2: 'rgba(45, 156, 219, 1)',
          blue1: 'rgba(47, 128, 237, 1)',
          yellow: 'rgba(242, 201, 76, 1)',
          orange: 'rgba(242, 153, 74, 1)',
          red: 'rgba(235, 87, 87, 1)',
          neon: 'rgba(228, 255, 193, 1)',
          gray5: 'rgba(242, 242, 242, 1)',
          gray4: 'rgba(224, 224, 224, 1)',
          gray3: 'rgba(189, 189, 189, 1)',
          gray2: 'rgba(130, 130, 130, 1)',
          gray1: 'rgba(79, 79, 79, 1)',
          white: 'rgba(255, 255, 255, 1)',
          black: 'rgba(51, 51, 51, 1)'
        },
        path: TEMP_FOLDER_JS,
        name: TEMP_FILE,
        format: 'js'
      }
    ];

    writeTokens(TOKENS);
    const FILE_EXISTS = fs.existsSync(`${TEMP_FOLDER_JS}/${TEMP_FILE}.js`);
    expect(FILE_EXISTS).toBe(true);
    await trash(TEMP_FOLDER_JS);
  });
});
