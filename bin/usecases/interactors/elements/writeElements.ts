import { Config } from '../../../contracts/Config';
import { FigmagicElement } from '../../../contracts/FigmagicElement';
import { WriteOperation } from '../../../contracts/Write';

import { toPascalCase } from '../../../frameworks/string/toPascalCase';
import { writeFile } from '../../../frameworks/filesystem/writeFile';
import { checkIfExists } from '../../../frameworks/filesystem/checkIfExists';

import { ErrorWriteElements } from '../../../frameworks/errors/errors';

/**
 * @description Funnel function to write all the wanted files per element
 */
export function writeElements(elements: any[], config: Config): void {
  try {
    if (!elements || !config) throw new Error(ErrorWriteElements);

    elements.forEach((element) => {
      const FIXED_CONFIG = makeFixedConfig(element, config);

      if (!config.skipFileGeneration.skipReact) {
        const PATH = `${FIXED_CONFIG.folder}/${FIXED_CONFIG.fixedName}.${FIXED_CONFIG.outputFormatElements}`;
        writeFileHelper(
          FIXED_CONFIG,
          'component',
          config.outputFormatElements,
          checkIfExists(PATH)
        );
      }

      if (!config.skipFileGeneration.skipStyled) {
        const PATH = `${FIXED_CONFIG.folder}/${FIXED_CONFIG.fixedName}Styled.${FIXED_CONFIG.outputFormatElements}`;
        writeFileHelper(FIXED_CONFIG, 'styled', config.outputFormatElements, checkIfExists(PATH));
      }

      if (!config.skipFileGeneration.skipStorybook) {
        const PATH = `${FIXED_CONFIG.folder}/${FIXED_CONFIG.fixedName}.stories.${FIXED_CONFIG.outputFormatStorybook}`;
        writeFileHelper(FIXED_CONFIG, 'story', config.outputFormatStorybook, checkIfExists(PATH));
      }

      if (!config.skipFileGeneration.skipCss)
        writeFileHelper(FIXED_CONFIG, 'css', config.outputFormatCss);

      if (!config.skipFileGeneration.skipDescription)
        writeFileHelper(FIXED_CONFIG, 'description', config.outputFormatDescription);
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
  const outputFormatDescription = config.outputFormatDescription;
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
    outputFormatDescription,
    outputFormatElements,
    outputFormatStorybook,
    metadata,
    templates,
    forceUpdate,
    fixedName
  } as any;
};

/**
 * @description Helper to consolidate writing the different types of files.
 * Undefined on "fileExists" simply means that it's not applicable to this file
 */
const writeFileHelper = (
  config: WriteOperation,
  type: string,
  format: string,
  fileExists: boolean | undefined = undefined
): void => {
  if (fileExists === false || config.forceUpdate) {
    const FILE_DATA = (() => {
      if (type === 'description') return config.description;
      if (type === 'css') return config.css;
      return config.html;
    })();

    writeFile({
      type,
      file: FILE_DATA,
      path: config.folder,
      name: config.fixedName,
      format,
      metadata: config.metadata,
      templates: config.templates
    } as WriteOperation);
  }
};
