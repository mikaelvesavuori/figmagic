import * as fs from 'fs';

import { Config } from '../../../contracts/Config';
import { WriteOperation } from '../../../contracts/Write';

import { toPascalCase } from '../../../frameworks/string/toPascalCase';
import { writeFile } from '../../../frameworks/filesystem/writeFile';

import { ErrorWriteElements } from '../../../frameworks/errors/errors';

/**
 * @description Funnel function to write all the wanted files per element
 *
 * @param elements Array of cleaned elements to write out to files
 * @param config User configuration object
 */
export function writeElements(elements: any[], config: Config): void {
  try {
    if (!elements || !config) throw new Error(ErrorWriteElements);

    elements.forEach((element) => {
      const FIXED_CONFIG = makeFixedConfig(element, config);
      if (!config.skipFileGeneration.skipReact) writeComponent(FIXED_CONFIG); // Write React component - is skipped by default if file already exists
      if (!config.skipFileGeneration.skipStyled) writeStyled(FIXED_CONFIG); // Write Styled component - is skipped by default if file already exists
      if (!config.skipFileGeneration.skipCss) writeCss(FIXED_CONFIG); // Write CSS - is always overwritten
      if (!config.skipFileGeneration.skipStorybook) writeStorybook(FIXED_CONFIG); // Write Storybook component - is skipped by default if file already exists
      if (!config.skipFileGeneration.skipDescription) writeDescription(FIXED_CONFIG); // Write description markdown file - is always overwritten
    });
  } catch (error) {
    throw new Error(error);
  }
}

const makeFixedConfig = (element, config): WriteOperation => {
  const html = element.html || ' ';
  const css = element.css || ' ';
  const description = element.description || ' ';
  const name = toPascalCase(element.name);
  const folder = `${config.outputFolderElements}/${name}`;
  const metadata = {
    dataType: null,
    html: element.html,
    element: element.element,
    extraProps: element.extraProps,
    text: element.text || ' ',
    imports: element.imports
  };

  const templates = config.templates;
  const forceUpdate = config.skipFileGeneration.forceUpdate;
  const fixedName = name.replace(/\//gi, '');

  return {
    html,
    css,
    description,
    name,
    folder,
    metadata,
    templates,
    forceUpdate,
    fixedName
  } as any;
};

const writeComponent = (config: WriteOperation): void => {
  const fileExists = fs.existsSync(`${config.folder}/${config.fixedName}.jsx`);
  if (!fileExists || config.forceUpdate)
    writeFile({
      type: 'component',
      file: config.html,
      path: config.folder,
      name,
      format: 'jsx',
      metadata: config.metadata,
      templates: config.templates
    } as WriteOperation);
};

const writeStyled = (config: WriteOperation): void => {
  const fileExists = fs.existsSync(`${config.folder}/${config.fixedName}Styled.jsx`);
  if (!fileExists || config.forceUpdate)
    writeFile({
      type: 'style',
      file: config.css,
      path: config.folder,
      name,
      format: 'jsx',
      metadata: config.metadata,
      templates: config.templates
    } as WriteOperation);
};

const writeCss = (config: WriteOperation): void => {
  writeFile({
    type: 'css',
    file: config.css,
    path: config.folder,
    name,
    format: 'jsx',
    metadata: config.metadata,
    templates: config.templates
  } as WriteOperation);
};

const writeStorybook = (config: WriteOperation): void => {
  const fileExists = fs.existsSync(`${config.folder}/${config.fixedName}.stories.js`);
  if (!fileExists || config.forceUpdate)
    writeFile({
      type: 'story',
      file: config.css,
      path: config.folder,
      name,
      format: 'js',
      metadata: config.metadata,
      templates: config.templates
    } as WriteOperation);
};

const writeDescription = (config: WriteOperation): void => {
  writeFile({
    type: 'description',
    file: config.description,
    path: config.folder,
    name,
    format: 'md',
    metadata: config.metadata,
    templates: config.templates
  } as WriteOperation);
};
