import * as fs from 'fs';

import { createFolder } from './createFolder';
import { loadFile } from './loadFile';
import { createImportStringFromList } from '../helpers/createImportStringFromList';
import { createEnumStringOutOfObject } from '../helpers/createEnumStringOutOfObject';

import { Metadata } from '../../app/contracts/filesystem/Metadata';
import { Templates } from '../../app/contracts/filesystem/Templates';

import { msgGeneratedFileWarning } from '../../meta/messages';
import {
  errorWriteFile,
  errorWriteFileWrongType,
  errorWrite,
  errorPrepareWrite
} from '../../meta/errors';

/**
 * Exposed function that handles writing files to disk
 *
 * @param file File contents
 * @param path File path minus file name
 * @param name File name
 * @param type What type of file is going to be written
 * @param format File format
 * @param metadata Any metadata needed for writing
 * @param templates Object of templates
 */
export async function writeFile(
  file: string,
  path: string,
  name: string,
  type: string,
  format: string = 'mjs',
  metadata?: Metadata,
  templates?: Templates
): Promise<void> {
  if (!file || !path || !name || !type) throw new Error(errorWriteFile);

  const _TYPE = type.toLowerCase();

  if (
    _TYPE !== 'raw' &&
    _TYPE !== 'token' &&
    _TYPE !== 'component' &&
    _TYPE !== 'style' &&
    _TYPE !== 'css' &&
    _TYPE !== 'story' &&
    _TYPE !== 'description'
  )
    throw new Error(errorWriteFileWrongType);

  createFolder(path);

  const { filePath, fileContent } = await prepareWrite(
    _TYPE,
    file,
    path,
    name,
    format,
    metadata,
    templates
  );

  await write(filePath, fileContent);
}

/**
 * Local helper that does most of the actual formatting of the file
 *
 * @param type What type of file is going to be written
 * @param file File contents
 * @param path File path minus file name
 * @param name File name
 * @param format File format
 * @param metadata Any metadata needed for writing
 * @param templates Object of templates
 */
// TODO: Add real types
async function prepareWrite(
  type: string,
  file: string,
  path: string,
  name: string,
  format: string,
  metadata: Metadata | undefined | null,
  templates: Templates
) {
  if (type === 'css' || type === 'story' || type === 'component') {
    if (!templates) throw new Error(errorPrepareWrite);
  }

  let fileContent = ``;

  // Clean name from any slashes
  name = name.replace('//g', '');

  const ELEMENT = (() => {
    if (metadata) {
      if (metadata.element) {
        return metadata.element;
      } else return 'div';
    } else return 'div';
  })();

  const TEXT = (() => {
    if (metadata) {
      if (metadata.text) {
        return metadata.text;
      } else return '';
    } else return '';
  })();

  const EXTRA_PROPS = (() => {
    if (metadata) {
      if (metadata.extraProps) {
        return metadata.extraProps;
      } else return '';
    } else return '';
  })();

  const IMPORTS = (() => {
    if (metadata) {
      if (metadata.imports) {
        if (metadata.imports.length > 0) {
          return createImportStringFromList(metadata.imports);
        }
      } else return '';
    } else return '';
    return null;
  })();

  let filePath = `${path}/${name}`;

  if (type === 'raw') {
    fileContent = `${JSON.stringify(file, null, ' ')}`;
  }
  // Design token
  else if (type === 'token') {
    if (metadata && metadata.dataType === 'enum') {
      fileContent = `// ${msgGeneratedFileWarning}\n\nenum ${name} {${createEnumStringOutOfObject(
        file
      )}\n}\n\nexport default ${name};`;
    } else {
      fileContent = `// ${msgGeneratedFileWarning}\n\nconst ${name} = ${JSON.stringify(
        file,
        null,
        ' '
      )}\n\nexport default ${name};`;
    }
    filePath += `.${format}`;
  }
  // Component
  else if (type === 'component') {
    const SUFFIX = 'Styled';
    const PATH = templates.templatePathReact;
    let template = await loadFile(PATH, true);
    template = template.replace(/{{NAME}}/gi, name);
    template = template.replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`);
    template = template.replace(/{{EXTRA_PROPS}}/gi, EXTRA_PROPS);
    template = template.replace(/\s>/gi, '>'); // Remove any ugly spaces before ending ">"
    template = template.replace(/{{TEXT}}/gi, TEXT);
    //template = template.replace(/{{MARKUP}}/gi, MARKUP);
    fileContent = `${template}`;
    filePath += `.${format}`;
  }
  // Styled Components
  else if (type === 'style') {
    const SUFFIX = 'Styled';
    const PATH = templates.templatePathStyled;
    let template = await loadFile(PATH, true);
    template = template.replace(/{{ELEMENT}}/gi, ELEMENT);
    template = template.replace(/{{NAME_CSS}}/gi, `${name}Css`);
    template = template.replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`);
    fileContent = `${template}`;
    filePath += `${SUFFIX}.${format}`;
  }
  // CSS
  else if (type === 'css') {
    const SUFFIX = 'Css';
    fileContent = `// ${msgGeneratedFileWarning}\n\n${IMPORTS}\nconst ${name}${SUFFIX} = \`${file}\`;\n\nexport default ${name}${SUFFIX};`;
    filePath += `${SUFFIX}.${format}`;
  }
  // Storybook
  else if (type === 'story') {
    const SUFFIX = '.stories';
    const PATH = templates.templatePathStorybook;
    let template = await loadFile(PATH, true);
    template = template.replace(/{{NAME}}/gi, name);
    template = template.replace(/{{TEXT}}/gi, TEXT);
    //template = template.replace(/{{MARKUP}}/gi, MARKUP);
    fileContent = `${template};`;
    filePath += `${SUFFIX}.${format}`;
  }
  // Markdown description
  else if (type === 'description') {
    fileContent = `<!--${msgGeneratedFileWarning}-->\n${file}`;
    filePath += `.description.${format}`;
  }

  return { fileContent, filePath };
}

/**
 * Local helper that does the actual writing of the file
 *
 * @param filePath File path minus file name
 * @param fileContent File contents
 * @returns Returns promise from wrapped fs.writeFile
 */
async function write(filePath: string, fileContent: string): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    try {
      fs.writeFile(filePath, fileContent, 'utf-8', (error) => {
        if (error) throw new Error(`${errorWrite}: ${error}`);
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
}
