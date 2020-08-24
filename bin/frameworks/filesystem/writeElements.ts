import * as fs from 'fs';

import { Config } from '../../entities/Config/Config';

import { toPascalCase } from '../string/toPascalCase';
import { writeFile } from './writeFile';

import { ErrorWriteElements } from '../errors/errors';

/**
 * @description Funnel function to write all the wanted files per element
 *
 * @param elements Array of cleaned elements to write out to files
 * @param config User configuration object
 */
export async function writeElements(elements: any[], config: Config): Promise<void> {
  if (!elements || !config) throw new Error(ErrorWriteElements);

  await elements.forEach((comp) => {
    const HTML = comp.html;
    const CSS = comp.css;
    const DESCRIPTION = comp.description || ' ';
    const NAME = toPascalCase(comp.name);
    const FOLDER = `${config.outputFolderElements}/${NAME}`;
    const METADATA = {
      html: comp.html,
      element: comp.element,
      extraProps: comp.extraProps,
      text: comp.text,
      imports: comp.imports
    };
    const FORMAT = config.outputTokenFormat;
    const TEMPLATES = config.templates;

    // Setup for skipping files, if user wants to do so
    const SKIP_REACT = config.skipFileGeneration.skipReact;
    const SKIP_STYLED = config.skipFileGeneration.skipStyled;
    const SKIP_CSS = config.skipFileGeneration.skipCss;
    const SKIP_STORYBOOK = config.skipFileGeneration.skipStorybook;
    const SKIP_DESCRIPTION = config.skipFileGeneration.skipDescription;
    const FORCE_UPDATE = config.skipFileGeneration.forceUpdate;

    // Ensure that name is processed like the "write()" function(s) do, so filename matching is same
    const _NAME = NAME.replace('//g', '');

    // Write React component - is skipped by default if file already exists
    if (!SKIP_REACT) {
      const FILE_EXISTS = fs.existsSync(`${FOLDER}/${_NAME}.jsx`);
      if (!FILE_EXISTS || FORCE_UPDATE) {
        writeFile(HTML, FOLDER, NAME, 'component', 'jsx', METADATA, TEMPLATES);
      }
    }

    // Write Styled component - is skipped by default if file already exists
    if (!SKIP_STYLED) {
      const FILE_EXISTS = fs.existsSync(`${FOLDER}/${_NAME}Styled.jsx`);
      if (!FILE_EXISTS || FORCE_UPDATE) {
        writeFile(CSS, FOLDER, NAME, 'style', 'jsx', METADATA, TEMPLATES);
      }
    }

    // Write CSS - is always overwritten
    if (!SKIP_CSS) writeFile(CSS, FOLDER, NAME, 'css', FORMAT, METADATA, TEMPLATES);

    // Write Storybook component - is skipped by default if file already exists
    if (!SKIP_STORYBOOK) {
      const FILE_EXISTS = fs.existsSync(`${FOLDER}/${_NAME}.stories.js`);
      if (!FILE_EXISTS || FORCE_UPDATE) {
        writeFile(CSS, FOLDER, NAME, 'story', 'js', METADATA, TEMPLATES);
      }
    }

    // Write description markdown file - is always overwritten
    if (!SKIP_DESCRIPTION) writeFile(DESCRIPTION, FOLDER, NAME, 'description', 'md');
  });

  return;
}
