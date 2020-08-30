import * as fs from 'fs';

import { Config } from '../../entities/Config/Config';
import { WriteOperation } from '../../app/contracts/Write';

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

  return await elements.forEach(async (comp) => {
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
    //const format = config.outputTokenFormat; // TODO: CHECK THIS
    const templates = config.templates;

    // Setup for skipping files, if user wants to do so
    const skipReact = config.skipFileGeneration.skipReact;
    const skipStyled = config.skipFileGeneration.skipStyled;
    const skipCss = config.skipFileGeneration.skipCss;
    const skipStorybook = config.skipFileGeneration.skipStorybook;
    const skipDescription = config.skipFileGeneration.skipDescription;
    const forceUpdate = config.skipFileGeneration.forceUpdate;

    // Ensure that name is processed like the "write()" function(s) do, so filename matching is same
    const _name = name.replace('//g', '');

    // Write React component - is skipped by default if file already exists
    if (!skipReact) {
      const fileExists = fs.existsSync(`${folder}/${_name}.jsx`);
      if (!fileExists || forceUpdate) {
        //writeFile(html, folder, name, 'component', 'jsx', metadata, templates);

        const writeOperation: WriteOperation = {
          type: 'component',
          file: html,
          path: folder,
          name,
          format: 'jsx',
          metadata,
          templates
        };

        await writeFile(writeOperation);
      }
    }

    // Write Styled component - is skipped by default if file already exists
    if (!skipStyled) {
      const fileExists = fs.existsSync(`${folder}/${_name}Styled.jsx`);
      if (!fileExists || forceUpdate) {
        //writeFile(css, folder, name, 'style', 'jsx', metadata, templates);

        const writeOperation: WriteOperation = {
          type: 'style',
          file: css,
          path: folder,
          name,
          format: 'jsx',
          metadata,
          templates
        };

        await writeFile(writeOperation);
      }
    }

    // Write CSS - is always overwritten
    if (!skipCss) {
      //writeFile(css, folder, name, 'css', format, metadata, templates);

      const writeOperation: WriteOperation = {
        type: 'css',
        file: css,
        path: folder,
        name,
        format: 'jsx',
        metadata,
        templates
      };

      await writeFile(writeOperation);
    }

    // Write Storybook component - is skipped by default if file already exists
    if (!skipStorybook) {
      const fileExists = fs.existsSync(`${folder}/${_name}.stories.js`);
      if (!fileExists || forceUpdate) {
        //writeFile(css, folder, name, 'story', 'js', metadata, templates);

        const writeOperation: WriteOperation = {
          type: 'story',
          file: css,
          path: folder,
          name,
          format: 'js',
          metadata,
          templates
        };

        await writeFile(writeOperation);
      }
    }

    // Write description markdown file - is always overwritten
    if (!skipDescription) {
      //writeFile(description, folder, name, 'description', 'md');

      const writeOperation: WriteOperation = {
        type: 'description',
        file: description,
        path: folder,
        name,
        format: 'md',
        metadata,
        templates
      };

      await writeFile(writeOperation);
    }
  });
}
