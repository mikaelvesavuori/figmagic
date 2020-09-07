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
  if (!elements || !config) throw new Error(ErrorWriteElements);

  try {
    elements.forEach((element) => {
      const html = element.html;
      const css = element.css;
      const description = element.description || ' ';
      const name = toPascalCase(element.name);
      const folder = `${config.outputFolderElements}/${name}`;
      const metadata = {
        dataType: null,
        html: element.html,
        element: element.element,
        extraProps: element.extraProps,
        text: element.text,
        imports: element.imports
      };

      const templates = config.templates;
      const forceUpdate = config.skipFileGeneration.forceUpdate;
      const _name = name.replace(/\//gi, '');

      // Write React component - is skipped by default if file already exists
      if (!config.skipFileGeneration.skipReact) {
        const fileExists = fs.existsSync(`${folder}/${_name}.jsx`);
        if (!fileExists || forceUpdate)
          writeFile({
            type: 'component',
            file: html,
            path: folder,
            name,
            format: 'jsx',
            metadata,
            templates
          } as WriteOperation);
      }

      // Write Styled component - is skipped by default if file already exists
      if (!config.skipFileGeneration.skipStyled) {
        const fileExists = fs.existsSync(`${folder}/${_name}Styled.jsx`);
        if (!fileExists || forceUpdate)
          writeFile({
            type: 'style',
            file: css,
            path: folder,
            name,
            format: 'jsx',
            metadata,
            templates
          } as WriteOperation);
      }

      // Write CSS - is always overwritten
      if (!config.skipFileGeneration.skipCss)
        writeFile({
          type: 'css',
          file: css,
          path: folder,
          name,
          format: 'jsx',
          metadata,
          templates
        } as WriteOperation);

      // Write Storybook component - is skipped by default if file already exists
      if (!config.skipFileGeneration.skipStorybook) {
        const fileExists = fs.existsSync(`${folder}/${_name}.stories.js`);
        if (!fileExists || forceUpdate)
          writeFile({
            type: 'story',
            file: css,
            path: folder,
            name,
            format: 'js',
            metadata,
            templates
          } as WriteOperation);
      }

      // Write description markdown file - is always overwritten
      if (!config.skipFileGeneration.skipDescription)
        writeFile({
          type: 'description',
          file: description,
          path: folder,
          name,
          format: 'md',
          metadata,
          templates
        } as WriteOperation);
    });
  } catch (error) {
    throw new Error(error);
  }
}
