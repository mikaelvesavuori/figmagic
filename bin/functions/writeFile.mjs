import fs from 'fs';

import { createFolder } from './createFolder.mjs';
import { errorWriteFile, errorWrite } from '../meta/errors.mjs';

/**
 * Exposed function that handles writing files to disk
 *
 * @exports
 * @function
 * @param {string} file - File contents
 * @param {string} path - File path minus file name
 * @param {string} name - File name
 * @param {boolean} isToken - If this is a token or not
 * @param {string} format - File format
 */
export function writeFile(file, path, name, isToken = false, format) {
	if (file && path && name) {
		createFolder(path);
		write(file, path, name, isToken, format);
	} else {
		throw new Error(errorWriteFile);
	}
}

/**
 * Local helper that does most of the actual formatting and writing of the file
 * @function
 * @param {string} file - File contents
 * @param {string} path - File path minus file name
 * @param {string} name - File name
 * @param {boolean} isToken - If this is a token or not
 * @param {string} format - File format
 */
function write(file, path, name, isToken, format) {
	let fileContent = file;
	let filePath = `${path}/${name}`;

	if (isToken) {
		fileContent = `const ${name} = ${JSON.stringify(file, null, ' ')}\n\nexport default ${name};`;
		filePath += `.${format}`;
	}

	fs.writeFile(filePath, fileContent, 'utf-8', function(error) {
		if (error) {
			throw new Error(`${errorWrite}: ${error}`);
		}
	});
}
