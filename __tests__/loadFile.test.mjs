import { loadFile } from '../bin/functions/loadFile';

test('It should throw an error if no parameter is provided', async () => {
  await expect(loadFile()).rejects.toThrow();
});

test('It should throw an error if invalid path is provided', async () => {
  const BAD_PATH = `./AKLJR#LJKASlaks`;
  await expect(loadFile(BAD_PATH)).rejects.toThrow();
});

test('It should return data from local file', async () => {
  const FILE = await loadFile(`${process.cwd()}/testdata/figmagicrc`);
  expect(FILE).toEqual(
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
