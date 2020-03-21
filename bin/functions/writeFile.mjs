import fs from 'fs';

import { createFolder } from './createFolder.mjs';
import { loadFile } from './loadFile.mjs';

import { errorWriteFile, errorWriteFileWrongType, errorWrite } from '../meta/errors.mjs';

/**
 * Exposed function that handles writing files to disk
 *
 * @exports
 * @function
 * @param {string} file - File contents
 * @param {string} path - File path minus file name
 * @param {string} name - File name
 * @param {string} type - What type of file is going to be written
 * @param {string} format - File format
 * @param {object} metadata - Any metadata needed for writing
 */
export async function writeFile(file, path, name, type, format = 'mjs', metadata) {
  if (!file || !path || !name || !type) throw new Error(errorWriteFile);

  const _TYPE = type.toLowerCase();

  if (
    _TYPE !== 'raw' &&
    _TYPE !== 'token' &&
    _TYPE !== 'component' &&
    _TYPE !== 'style' &&
    _TYPE !== 'css'
  )
    throw new Error(errorWriteFileWrongType);

  createFolder(path);

  const { filePath, fileContent } = await prepareWrite(_TYPE, file, path, name, format, metadata);

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
 * @returns {Promise} - Returns promise from wrapped fs.writeFile
 */
async function prepareWrite(type, file, path, name, format, metadata) {
  console.log('metadata', metadata);
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

  const MARKUP = (() => {
    if (metadata) {
      if (metadata.markup) {
        return metadata.markup;
      } else return '';
    } else return '';
  })();

  let filePath = `${path}/${name}`;

  if (type === 'raw') {
    fileContent = `${JSON.stringify(file, null, ' ')}`;
    filePath += `.${format}`;
  } else if (type === 'token') {
    fileContent = `const ${name} = ${JSON.stringify(file, null, ' ')}\n\nexport default ${name};`;
    filePath += `.${format}`;
  } else if (type === 'component') {
    const SUFFIX = 'Styled';
    let reactTemplate = await loadFile('templates/react.jsx', true);
    reactTemplate = reactTemplate.replace(/{{NAME}}/gi, name);
    reactTemplate = reactTemplate.replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`);
    reactTemplate = reactTemplate.replace(/{{MARKUP}}/gi, MARKUP);
    fileContent = `${reactTemplate}`;
    filePath += `.${format}`;
  } else if (type === 'style') {
    const SUFFIX = 'Styled';
    let cssTemplate = await loadFile('templates/styled.jsx', true);
    cssTemplate = cssTemplate.replace(/{{ELEMENT}}/gi, ELEMENT);
    cssTemplate = cssTemplate.replace(/{{NAME_CSS}}/gi, `${name}Css`);
    cssTemplate = cssTemplate.replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`);
    fileContent = `${cssTemplate}`;
    filePath += `${SUFFIX}.${format}`;
  } else if (type === 'css') {
    const SUFFIX = 'Css';
    fileContent = `const ${name}${SUFFIX} = \`${file}\`\n\nexport default ${name}${SUFFIX};`;
    filePath += `${SUFFIX}.${format}`;
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
