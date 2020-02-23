import { loadFile } from '../bin/functions/loadFile';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    loadFile();
  }).toThrow();
});

test('It should return data from local file', async () => {
  const FILE = await loadFile(`${process.cwd()}/.figmagicrc`);
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
