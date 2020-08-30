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
export async function writeElements(elements: any[], config: Config): Promise<any> {
  if (!elements || !config) throw new Error(ErrorWriteElements);

  return await elements.forEach((comp) => {
    const html = comp.html;
    const css = comp.css;
    const description = comp.description || ' ';
    const name = toPascalCase(comp.name);
    const folder = `${config.outputFolderElements}/${name}`;
    const metadata = {
      dataType: null, // TODO: Verify this
      html: comp.html,
      element: comp.element,
      extraProps: comp.extraProps,
      text: comp.text,
      imports: comp.imports
    };
    const format = config.outputTokenFormat;
    const templates = config.templates;

    // Setup for skipping files, if user wants to do so
    const skipReact = config.skipFileGeneration.skipReact;
    const skipStyled = config.skipFileGeneration.skipStyled;
    const skipCss = config.skipFileGeneration.skipCss;
    const skipStorybook = config.skipFileGeneration.skipStorybook;
    const skipDescription = config.skipFileGeneration.skipDescription;
    const forceUpdate = config.skipFileGeneration.forceUpdate;

    // Ensure that name is processed like the "write()" function(s) do, so filename matching is same
    const _NAME = name.replace('//g', '');

    // Write React component - is skipped by default if file already exists
    if (!skipReact) {
      const fileExists = fs.existsSync(`${folder}/${_NAME}.jsx`);
      if (!fileExists || forceUpdate)
        writeFile(html, folder, name, 'component', 'jsx', metadata, templates);
    }

    // Write Styled component - is skipped by default if file already exists
    if (!skipStyled) {
      const fileExists = fs.existsSync(`${folder}/${_NAME}Styled.jsx`);
      if (!fileExists || forceUpdate)
        writeFile(css, folder, name, 'style', 'jsx', metadata, templates);
    }

    // Write CSS - is always overwritten
    if (!skipCss) writeFile(css, folder, name, 'css', format, metadata, templates);

    // Write Storybook component - is skipped by default if file already exists
    if (!skipStorybook) {
      const fileExists = fs.existsSync(`${folder}/${_NAME}.stories.js`);
      if (!fileExists || forceUpdate)
        writeFile(css, folder, name, 'story', 'js', metadata, templates);
    }

    // Write description markdown file - is always overwritten
    if (!skipDescription) writeFile(description, folder, name, 'description', 'md');
  });
}
