import { Config } from '../../../contracts/Config';
import { FigmagicElement } from '../../../contracts/FigmagicElement';
import { WriteOperation } from '../../../contracts/Write';

import { writeFile } from '../../../frameworks/filesystem/writeFile';
import { checkIfExists } from '../../../frameworks/filesystem/checkIfExists';
import { getSvgFileData } from '../../../frameworks/filesystem/getSvgFileData';
import { cleanSvgData } from '../../../frameworks/string/cleanSvgData';
import { sanitizeStringPascalCase } from '../../../frameworks/string/sanitizeString';

import { ErrorWriteElements } from '../../../frameworks/errors/errors';

/**
 * @description Funnel function to write all the wanted files per element
 * @todo Refactor: writeFileHelper() should take fewer params since we are already passing in fixed config...?
 */
export function writeElements(
  elements: FigmagicElement[],
  config: Config,
  isGeneratingGraphics = false
): void {
  if (!elements || !config) throw Error(ErrorWriteElements);

  elements.forEach((element: FigmagicElement) => {
    const fixedConfig = makeFixedConfig(element, config);

    if (!config.skipFileGeneration.skipReact) {
      const path = `${fixedConfig.folder}/${fixedConfig.fixedName}.${fixedConfig.outputFormatElements}`;
      const type = isGeneratingGraphics ? 'graphic' : 'component';
      writeFileHelper(fixedConfig, type, config.outputFormatElements, checkIfExists(path));
    }

    if (!isGeneratingGraphics) {
      if (!config.skipFileGeneration.skipStorybook) {
        const path = `${fixedConfig.folder}/${fixedConfig.fixedName}.stories.${fixedConfig.outputFormatStorybook}`;
        writeFileHelper(fixedConfig, 'story', config.outputFormatStorybook, checkIfExists(path));
      }

      if (!config.skipFileGeneration.skipDescription) {
        const path = `${fixedConfig.folder}/${fixedConfig.fixedName}.description.${fixedConfig.outputFormatDescription}`;
        writeFileHelper(
          fixedConfig,
          'description',
          config.outputFormatDescription,
          checkIfExists(path)
        );
      }

      if (!config.skipFileGeneration.skipStyled) {
        const path = `${fixedConfig.folder}/${fixedConfig.fixedName}Styled.${fixedConfig.outputFormatElements}`;
        writeFileHelper(fixedConfig, 'styled', config.outputFormatElements, checkIfExists(path));
      }

      if (!config.skipFileGeneration.skipCss) {
        const path = `${fixedConfig.folder}/${fixedConfig.fixedName}Css.${fixedConfig.outputFormatCss}`;
        writeFileHelper(fixedConfig, 'css', config.outputFormatCss, checkIfExists(path));
      }
    }
  });
}

/**
 * @description Create an updated user configuration that is able to drive write operations
 */
const makeFixedConfig = (element: FigmagicElement, config: Config): WriteOperation => {
  const html = element.html || ' ';
  const css = element.css || ' ';
  const description = element.description || ' ';
  const name = sanitizeStringPascalCase(element.name);
  const folder = `${config.outputFolderElements}/${name}`;
  const {
    outputFormatCss,
    outputFormatDescription,
    outputFormatElements,
    outputFormatStorybook,
    outputFolderElements,
    outputFolderGraphics,
    outputFolderTokens,
    overwrite,
    tokensRelativeImportPrefix
  } = config;

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
  const fixedName = name.trim().replace(/\s/g, '');

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
    outputFolderElements,
    outputFolderGraphics,
    outputFolderTokens,
    overwrite,
    tokensRelativeImportPrefix,
    metadata,
    templates,
    forceUpdate,
    fixedName
  } as any;
};

/**
 * @description Helper to consolidate writing the different types of files.
 */
const writeFileHelper = (
  config: WriteOperation,
  type: string,
  format: string,
  fileExists?: boolean | undefined
): void => {
  // @ts-ignore
  const shouldOverwrite = config.overwrite[type] || false;
  const forceUpdate = config.forceUpdate;

  if (!fileExists || shouldOverwrite || forceUpdate) {
    const fileData = (() => {
      if (type === 'graphic') {
        const svgData = getSvgFileData(`${config.outputFolderGraphics}/${config.fixedName}.svg`);
        return cleanSvgData(svgData);
      }
      if (type === 'description') return config.description;
      if (type === 'css') return config.css;
      return config.html;
    })();

    const {
      folder,
      fixedName,
      outputFolderElements,
      outputFolderGraphics,
      outputFolderTokens,
      tokensRelativeImportPrefix,
      metadata,
      templates
    } = config;

    writeFile({
      type,
      file: fileData,
      path: folder,
      name: fixedName,
      format,
      outputFolderElements,
      outputFolderGraphics,
      outputFolderTokens,
      tokensRelativeImportPrefix,
      metadata,
      templates
    } as WriteOperation);
  }
};
