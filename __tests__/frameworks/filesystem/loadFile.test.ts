import * as path from 'path';

import { loadFile } from '../../../bin/frameworks/filesystem/loadFile';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(() => loadFile()).toThrowError();
  });

  test('It should throw an error if invalid path is provided', () => {
    const BAD_PATH = `./AKLJR#LJKASlaks`;
    expect(() => loadFile(BAD_PATH)).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should return data from local file', () => {
    const FILE = loadFile(path.join(`${process.cwd()}`, `testdata`, `figmagicrc`));
    expect(FILE).toEqual(
      expect.objectContaining({
        debugMode: false,
        fontUnit: 'rem',
        figmaData: 'figma.json',
        figmagicFolder: '.figmagic',
        outputFolderGraphics: 'graphics',
        outputFolderTokens: 'tokens',
        outputFormatGraphics: 'svg',
        outputScaleGraphics: 1,
        outputFormatTokens: 'ts',
        spacingUnit: 'rem',
        usePostscriptFontNames: false
      })
    );
  });

  /*
// DEACTIVATING THIS, AS IT BREAKS ON WINDOWS BUILDS (...?)

test('It should return data from local file in raw format (not JSON-parsed)', () => {
  const FILE = loadFile(path.join(`${process.cwd()}`, `testdata`, `figmagicrc`), true);

  expect(FILE).toBe(`{
  \"debugMode\": false,
  \"fontUnit\": \"rem\",
  \"figmaData\": \"figma.json\",
  \"figmagicFolder\": \".figmagic\",
  \"outputFolderTokens\": \"tokens\",
  \"outputFormatTokens\": \"mjs\",
  \"outputFolderGraphics\": \"graphics\",
  \"outputFormatGraphics\": \"svg\",
  \"outputScaleGraphics\": 1,
  \"spacingUnit\": \"rem\",
  \"usePostscriptFontNames\": false
}`);
});
  */
});
