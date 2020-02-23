import { createConfiguration } from '../bin/functions/createConfiguration';

test('It should return a valid merged configuration if given a path to an RC file and a set of CLI arguments', async () => {
  const CLI_ARGS = ['-t', 'asdf1234'];
  expect(await createConfiguration(`${process.cwd}/.figmagicrc`, ...CLI_ARGS)).toEqual(
    expect.objectContaining({
      debugMode: false,
      fontUnit: 'rem',
      outputFileName: 'figma.json',
      outputFolderBaseFile: 'figma',
      outputFolderTokens: 'tokens',
      outputTokenFormat: 'mjs',
      spacingUnit: 'rem',
      token: 'asdf1234',
      url: null,
      usePostscriptFontNames: false
    })
  );
});

test('It should throw an error when missing user configuration path', () => {
  expect(() => {
    createConfiguration();
  }).toThrow();
});
