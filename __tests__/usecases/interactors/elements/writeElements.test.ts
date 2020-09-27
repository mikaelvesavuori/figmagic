import trash from 'trash';
import * as fs from 'fs';
import path from 'path';

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

  test('It should skip writing React files', async () => {
    const configNoReact = { ...baseConfig };
    configNoReact.skipFileGeneration.skipReact = true;
    writeElements(elements, configNoReact);
    const FILE_EXISTS = fs.existsSync(path.join(TEMP_FOLDER, 'Microcopy', 'Microcopy.tsx'));
    expect(FILE_EXISTS).toBeFalsy();
    await trash(TEMP_FOLDER);
  });

  test('It should skip writing Styled Components files', async () => {
    const configNoStyled = { ...baseConfig };
    configNoStyled.skipFileGeneration.skipStyled = true;
    writeElements(elements, configNoStyled);
    const FILE_EXISTS = fs.existsSync(path.join(TEMP_FOLDER, 'Microcopy', 'MicrocopyStyled.tsx'));
    expect(FILE_EXISTS).toBeFalsy();
    await trash(TEMP_FOLDER);
  });

  test('It should skip writing CSS files', async () => {
    const configNoCss = { ...baseConfig };
    configNoCss.skipFileGeneration.skipCss = true;
    writeElements(elements, configNoCss);
    const FILE_EXISTS = fs.existsSync(path.join(TEMP_FOLDER, 'Microcopy', 'MicrocopyCss.ts'));
    expect(FILE_EXISTS).toBeFalsy();
    await trash(TEMP_FOLDER);
  });

  test('It should skip writing Storybook files', async () => {
    const configNoStorybook = { ...baseConfig };
    configNoStorybook.skipFileGeneration.skipStorybook = true;
    writeElements(elements, configNoStorybook);
    const FILE_EXISTS = fs.existsSync(path.join(TEMP_FOLDER, 'Microcopy', 'Microcopy.stories.js'));
    expect(FILE_EXISTS).toBeFalsy();
    await trash(TEMP_FOLDER);
  });

  test('It should skip writing description files', async () => {
    const configNoDesc = { ...baseConfig };
    configNoDesc.skipFileGeneration.skipDescription = true;
    writeElements(elements, configNoDesc);
    const FILE_EXISTS = fs.existsSync(
      path.join(TEMP_FOLDER, 'Microcopy', 'Microcopy.description.md')
    );
    expect(FILE_EXISTS).toBeFalsy();
    await trash(TEMP_FOLDER);
  });
});
