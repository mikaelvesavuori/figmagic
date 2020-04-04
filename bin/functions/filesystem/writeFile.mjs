import fs from 'fs';

import { createFolder } from './createFolder.mjs';
import { loadFile } from './loadFile.mjs';
import { createImportStringFromList } from '../helpers/createImportStringFromList.mjs';

import { msgGeneratedFileWarning } from '../../meta/messages.mjs';
import {
  errorWriteFile,
  errorWriteFileWrongType,
  errorWrite,
  errorPrepareWrite
} from '../../meta/errors.mjs';

/**
 * Exposed function that handles writing files to disk
 *
 * @exports
 * @async
 * @function
 * @param {string} file - File contents
 * @param {string} path - File path minus file name
 * @param {string} name - File name
 * @param {string} type - What type of file is going to be written
 * @param {string} [format=mjs] - File format
 * @param {object} [metadata] - Any metadata needed for writing
 * @param {object} [templates] - Object of templates
 * @throws {errorWriteFile} - Throws error if missing file, path, name or type arguments
 */
export async function writeFile(file, path, name, type, format = 'mjs', metadata, templates) {
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
 * @async
 * @function
 * @param {string} type - What type of file is going to be written
 * @param {string} file - File contents
 * @param {string} path - File path minus file name
 * @param {string} name - File name
 * @param {string} format - File format
 * @param {object} metadata - Any metadata needed for writing
 * @param {object} templates - Object of templates
 * @returns {Promise} - Returns promise from wrapped fs.writeFile
 * @throws {errorPrepareWrite} - Throws error if valid type but missing template
 */
async function prepareWrite(type, file, path, name, format, metadata, templates) {
  if (type === 'css' || type === 'story' || type === 'component') {
    if (!templates) throw new Error(errorPrepareWrite);
  }

  let fileContent = ``;

  // Clean name from any slashes
  name = name.replace('/', '');

  const ELEMENT = (() => {
    if (metadata) {
      if (metadata.element) {
        return metadata.element;
      } else return 'div';
    } else return 'div';
  })();

  /*
  const MARKUP = (() => {
    if (metadata) {
      if (metadata.html) {
        return metadata.html;
      } else return '';
    } else return '';
	})();
	*/

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
        return createImportStringFromList(metadata.imports);
      } else return '';
    } else return '';
  })();

  let filePath = `${path}/${name}`;

  if (type === 'raw') {
    fileContent = `${JSON.stringify(file, null, ' ')}`;
  } else if (type === 'token') {
    fileContent = `// ${msgGeneratedFileWarning}\n\nconst ${name} = ${JSON.stringify(
      file,
      null,
      ' '
    )}\n\nexport default ${name};`;
    filePath += `.${format}`;
  } else if (type === 'component') {
    const SUFFIX = 'Styled';
    let template = await loadFile(templates.templatePathReact, true);
    template = template.replace(/{{NAME}}/gi, name);
    template = template.replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`);
    template = template.replace(/{{EXTRA_PROPS}}/gi, EXTRA_PROPS);
    template = template.replace(/\s>/gi, '>'); // Remove any ugly spaces before ending ">"
    template = template.replace(/{{TEXT}}/gi, TEXT);
    //template = template.replace(/{{MARKUP}}/gi, MARKUP);
    fileContent = `${template}`;
    filePath += `.${format}`;
  } else if (type === 'style') {
    const SUFFIX = 'Styled';
    let template = await loadFile(templates.templatePathStyled, true);
    template = template.replace(/{{ELEMENT}}/gi, ELEMENT);
    template = template.replace(/{{NAME_CSS}}/gi, `${name}Css`);
    template = template.replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`);
    fileContent = `${template}`;
    filePath += `${SUFFIX}.${format}`;
  } else if (type === 'css') {
    const SUFFIX = 'Css';
    fileContent = `// ${msgGeneratedFileWarning}\n\n${IMPORTS}\nconst ${name}${SUFFIX} = \`${file}\`;\n\nexport default ${name}${SUFFIX};`;
    filePath += `${SUFFIX}.${format}`;
  } else if (type === 'story') {
    const SUFFIX = '.stories';
    let template = await loadFile(templates.templatePathStorybook, true);
    template = template.replace(/{{NAME}}/gi, name);
    template = template.replace(/{{TEXT}}/gi, TEXT);
    //template = template.replace(/{{MARKUP}}/gi, MARKUP);
    fileContent = `${template};`;
    filePath += `${SUFFIX}.${format}`;
  } else if (type === 'description') {
    fileContent = `<!--${msgGeneratedFileWarning}-->\n${file}`;
    filePath += `.description.${format}`;
  }

  return { fileContent, filePath };
}

/**
 * Local helper that does most the actual writing of the file
 *
 * @async
 * @function
 * @param {string} filePath - File path minus file name
 * @param {string} fileContent- File contents
 * @returns {Promise} - Returns promise from wrapped fs.writeFile
 */
async function write(filePath, fileContent) {
  return await new Promise((resolve, reject) => {
    try {
      fs.writeFile(filePath, fileContent, 'utf-8', error => {
        if (error) throw new Error(`${errorWrite}: ${error}`);
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
}
