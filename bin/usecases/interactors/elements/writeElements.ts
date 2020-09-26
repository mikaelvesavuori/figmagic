import * as fs from 'fs';

import { Config } from '../../../contracts/Config';
import { FigmagicElement } from '../../../contracts/FigmagicElement';
import { WriteOperation } from '../../../contracts/Write';

import { toPascalCase } from '../../../frameworks/string/toPascalCase';
import { writeFile } from '../../../frameworks/filesystem/writeFile';

import { ErrorWriteElements } from '../../../frameworks/errors/errors';

/**
 * @description Funnel function to write all the wanted files per element
 */
export function writeElements(elements: any[], config: Config): void {
  try {
    if (!elements || !config) throw new Error(ErrorWriteElements);

    elements.forEach((element) => {
      const FIXED_CONFIG = makeFixedConfig(element, config);
      if (!config.skipFileGeneration.skipReact) writeComponent(FIXED_CONFIG);
      if (!config.skipFileGeneration.skipStyled) writeStyled(FIXED_CONFIG);
      if (!config.skipFileGeneration.skipCss) writeCss(FIXED_CONFIG);
      if (!config.skipFileGeneration.skipStorybook) writeStorybook(FIXED_CONFIG);
      if (!config.skipFileGeneration.skipDescription) writeDescription(FIXED_CONFIG);
    });
  } catch (error) {
    throw new Error(ErrorWriteElements);
  }
}

/**
 * @description Create an updated user configuration that is able to drive write operations
 */
const makeFixedConfig = (element: FigmagicElement, config: Config): WriteOperation => {
  const html = element.html || ' ';
  const css = element.css || ' ';
  const description = element.description || ' ';
  const name = toPascalCase(element.name);
  const folder = `${config.outputFolderElements}/${name}`;
  const outputFormatCss = config.outputFormatCss;
  const outputFormatElements = config.outputFormatElements;
  const outputFormatStorybook = config.outputFormatStorybook;
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
    outputFormatCss,
    outputFormatElements,
    outputFormatStorybook,
    metadata,
    templates,
    forceUpdate,
    fixedName
  } as any;
};

/**
 * @description Helper to write React component
 */
const writeComponent = (config: WriteOperation): void => {
  const FILE_EXISTS = fs.existsSync(
    `${config.folder}/${config.fixedName}.${config.outputFormatElements}`
  );

  if (!FILE_EXISTS || config.forceUpdate)
    writeFile({
      type: 'component',
      file: config.html,
      path: config.folder,
      name: config.fixedName,
      format: config.outputFormatElements,
      metadata: config.metadata,
      templates: config.templates
    } as WriteOperation);
};

/**
 * @description Helper to write Styled Components file
 */
const writeStyled = (config: WriteOperation): void => {
  const FILE_EXISTS = fs.existsSync(
    `${config.folder}/${config.fixedName}Styled.${config.outputFormatElements}`
  );
  if (!FILE_EXISTS || config.forceUpdate)
    writeFile({
      type: 'style',
      file: config.css,
      path: config.folder,
      name: config.fixedName,
      format: config.outputFormatElements,
      metadata: config.metadata,
      templates: config.templates
    } as WriteOperation);
};

/**
 * @description Helper to write CSS file
 */
const writeCss = (config: WriteOperation): void => {
  writeFile({
    type: 'css',
    file: config.css,
    path: config.folder,
    name: config.name,
    format: config.outputFormatCss,
    metadata: config.metadata,
    templates: config.templates
  } as WriteOperation);
};

/**
 * @description Helper to write Storybook component
 */
const writeStorybook = (config: WriteOperation): void => {
  const FILE_EXISTS = fs.existsSync(
    `${config.folder}/${config.fixedName}.stories.${config.outputFormatStorybook}`
  );
  if (!FILE_EXISTS || config.forceUpdate)
    writeFile({
      type: 'story',
      file: config.css,
      path: config.folder,
      name: config.fixedName,
      format: config.outputFormatStorybook,
      metadata: config.metadata,
      templates: config.templates
    } as WriteOperation);
};

/**
 * @description Helper to write Markdown description
 */
const writeDescription = (config: WriteOperation): void => {
  writeFile({
    type: 'description',
    file: config.description,
    path: config.folder,
    name: config.name,
    format: 'md',
    metadata: config.metadata,
    templates: config.templates
  } as WriteOperation);
};
