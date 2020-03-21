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
    _TYPE !== 'css' &&
    _TYPE !== 'story'
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
      if (metadata.html) {
        return metadata.html;
      } else return '';
    } else return '';
  })();

  let filePath = `${path}/${name}`;

  if (type === 'raw') {
    fileContent = `${JSON.stringify(file, null, ' ')}`;
    filePath += `.json`;
  } else if (type === 'token') {
    fileContent = `const ${name} = ${JSON.stringify(file, null, ' ')}\n\nexport default ${name};`;
    filePath += `.${format}`;
  } else if (type === 'component') {
    let template = await loadFile('templates/react.jsx', true);
    template = template.replace(/{{NAME}}/gi, name);
    template = template.replace(/{{NAME_STYLED}}/gi, `${name}`);
    template = template.replace(/{{MARKUP}}/gi, MARKUP);
    fileContent = `${template}`;
    filePath += `.${format}`;
  } else if (type === 'style') {
    const SUFFIX = 'Styled';
    let template = await loadFile('templates/styled.jsx', true);
    template = template.replace(/{{ELEMENT}}/gi, ELEMENT);
    template = template.replace(/{{NAME_CSS}}/gi, `${name}Css`);
    template = template.replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`);
    fileContent = `${template}`;
    filePath += `${SUFFIX}.${format}`;
  } else if (type === 'css') {
    const SUFFIX = 'Css';
    fileContent = `const ${name}${SUFFIX} = \`${file}\`\n\nexport default ${name}${SUFFIX};`;
    filePath += `${SUFFIX}.${format}`;
  } else if (type === 'story') {
    const SUFFIX = '.stories';
    let template = await loadFile('templates/story.js', true);
    template = template.replace(/{{NAME}}/gi, name);
    template = template.replace(/{{MARKUP}}/gi, MARKUP);
    fileContent = `${template}`;
    filePath += `${SUFFIX}.${format}`;
  }

  return { fileContent, filePath };
}

/*
async function setupFile(templateFile, replacements, suffix, format) {
  let template = await loadFile(templateFile, true);
  let fileContent = `${template}`;
  let filePath = `.${format}`;

  replacements.forEach(replacement => {
    fileContent = template.replace(/{{NAME}}/gi, "name");
  });

  return {
    fileContent,
    filePath
  };
}
*/

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
