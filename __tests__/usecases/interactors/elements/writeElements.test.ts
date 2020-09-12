import trash from 'trash';
import * as fs from 'fs';

import { baseConfig } from '../../../../bin/entities/Config/baseConfig';

import { writeElements } from '../../../../bin/usecases/interactors/elements/writeElements';

// Set temp folder
const TEMP_FOLDER = `__elements__`;
baseConfig.outputFolderElements = TEMP_FOLDER;

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

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(() => writeElements()).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should write files to disk, when given a valid configuration and set a elements', async () => {
    writeElements(elements, baseConfig);
    const FILE_EXISTS = fs.existsSync(TEMP_FOLDER);
    expect(FILE_EXISTS).toBeTruthy();
    await trash(TEMP_FOLDER);
  });
});
