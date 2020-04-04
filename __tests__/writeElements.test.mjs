import trash from 'trash';

import { writeElements } from '../bin/functions/filesystem/writeElements';

import { defaultConfig } from '../testdata/defaultConfig.mjs';

// Set temp folder
const TEMP_FOLDER = `__elements__`;
defaultConfig.outputFolderElements = TEMP_FOLDER;

const elements = [
  {
    id: '2875:22',
    name: 'Microcopy',
    element: 'sub',
    description: '\n# Sub\n\nTiny text snippets.',
    css:
      ' color: ${colors.black};\n' +
      'font-size: ${fontSizes.sub};\n' +
      'font-family: ${fontFamilies.regular};\n' +
      'font-weight: ${fontWeights.regular};\n' +
      'line-height: ${lineHeights.xs};\n' +
      'text-align: left;\n',
    html: '<sub>Microcopy</sub>',
    extraProps: '',
    text: 'Microcopy',
    imports: ['colors', 'fontSizes', 'fontFamilies', 'fontWeights', 'lineHeights']
  }
];

test('It should throw an error if no parameter is provided', async () => {
  await expect(writeElements()).rejects.toThrow();
});

test('It should return true when finished', async () => {
  console.log('!!!', defaultConfig.asdf);
  await expect(writeElements(elements, defaultConfig)).resolves.toBe(true);
  await trash(TEMP_FOLDER);
});
