import { createConfiguration } from '../bin/functions/config/createConfiguration';

test('It should return a valid merged configuration if given a path to an RC file and a set of CLI arguments', async () => {
  const USER_CONFIG_PATH = `${process.cwd()}/testdata/figmagicrc`;
  const CLI_ARGS = ['-t', 'asdf1234'];

  expect(await createConfiguration(USER_CONFIG_PATH, ...CLI_ARGS)).toEqual(
    expect.objectContaining({
      debugMode: false,
      fontUnit: 'rem',
      outputFileName: 'figma.json',
      outputFolderBaseFile: 'figma',
      outputFolderTokens: 'tokens',
      outputTokenFormat: 'mjs',
      spacingUnit: 'rem',
      usePostscriptFontNames: false
    })
  );
});

test('It should throw an error when missing user configuration path', async () => {
  await expect(createConfiguration()).rejects.toThrow();
});
