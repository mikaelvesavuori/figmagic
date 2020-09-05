import * as fs from 'fs';

import { Config } from '../../contracts/Config';
import { WriteOperation } from '../../contracts/Write';

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
    const forceUpdate = config.skipFileGeneration.forceUpdate;
    const _name = name.replace('//g', '');

    // Write React component - is skipped by default if file already exists
    if (!config.skipFileGeneration.skipReact) {
      const fileExists = fs.existsSync(`${folder}/${_name}.jsx`);
      if (!fileExists || forceUpdate)
        await writeFile({
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
        await writeFile({
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
      await writeFile({
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
        await writeFile({
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
      await writeFile({
        type: 'description',
        file: description,
        path: folder,
        name,
        format: 'md',
        metadata,
        templates
      } as WriteOperation);
  });
}
