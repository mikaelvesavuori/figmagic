import trash from 'trash';
import fs from 'fs';
import path from 'path';

import { baseConfig } from '../../../../bin/entities/Config/baseConfig';

import { writeElements } from '../../../../bin/usecases/interactors/elements/writeElements';

import { elements } from '../../../../testdata/elements/writeElements';

// Set temp folder
const TEMP_FOLDER = `__elements__`;
baseConfig.outputFolderElements = TEMP_FOLDER;

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(() => writeElements()).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should write files to disk, when given a valid configuration and a set of elements', async () => {
    const config = baseConfig;
    baseConfig.templates = {
      templatePathGraphic: 'templates/graphic',
      templatePathReact: 'templates/react',
      templatePathStorybook: 'templates/story',
      templatePathStyled: 'templates/styled'
    };
    writeElements(elements as any, config);
    const FILE_EXISTS = fs.existsSync(TEMP_FOLDER);
    expect(FILE_EXISTS).toBeTruthy();
    await trash(TEMP_FOLDER);
  });

  test('It should skip writing React files', async () => {
    const configNoReact = { ...baseConfig };
    configNoReact.skipFileGeneration.skipReact = true;
    writeElements(elements as any, configNoReact);
    const FILE_EXISTS = fs.existsSync(path.join(TEMP_FOLDER, 'Microcopy', 'Microcopy.tsx'));
    expect(FILE_EXISTS).toBeFalsy();
    await trash(TEMP_FOLDER);
  });

  test('It should skip writing Styled Components files', async () => {
    const configNoStyled = { ...baseConfig };
    configNoStyled.skipFileGeneration.skipStyled = true;
    writeElements(elements as any, configNoStyled);
    const FILE_EXISTS = fs.existsSync(path.join(TEMP_FOLDER, 'Microcopy', 'MicrocopyStyled.tsx'));
    expect(FILE_EXISTS).toBeFalsy();
    await trash(TEMP_FOLDER);
  });

  test('It should skip writing CSS files', async () => {
    const configNoCss = { ...baseConfig };
    configNoCss.skipFileGeneration.skipCss = true;
    writeElements(elements as any, configNoCss);
    const FILE_EXISTS = fs.existsSync(path.join(TEMP_FOLDER, 'Microcopy', 'MicrocopyCss.ts'));
    expect(FILE_EXISTS).toBeFalsy();
    await trash(TEMP_FOLDER);
  });

  test('It should skip writing Storybook files', async () => {
    const configNoStorybook = { ...baseConfig };
    configNoStorybook.skipFileGeneration.skipStorybook = true;
    writeElements(elements as any, configNoStorybook);
    const FILE_EXISTS = fs.existsSync(path.join(TEMP_FOLDER, 'Microcopy', 'Microcopy.stories.js'));
    expect(FILE_EXISTS).toBeFalsy();
    await trash(TEMP_FOLDER);
  });

  test('It should skip writing description files', async () => {
    const configNoDesc = { ...baseConfig };
    configNoDesc.skipFileGeneration.skipDescription = true;
    writeElements(elements as any, configNoDesc);
    const FILE_EXISTS = fs.existsSync(
      path.join(TEMP_FOLDER, 'Microcopy', 'Microcopy.description.md')
    );
    expect(FILE_EXISTS).toBeFalsy();
    await trash(TEMP_FOLDER);
  });
});
