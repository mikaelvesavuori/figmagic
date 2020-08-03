import fetch from 'node-fetch';
//import { promises as fs } from 'fs';
import * as fs from 'fs';

import { msgDownloadFileWritingFile } from '../../meta/messages';
import { errorDownloadFile } from '../../meta/errors';

/**
 * Get data from API
 *
 * @exports
 * @async
 * @function
 * @param {string} url - URL path
 * @param {string} folder - Folder path
 * @param {string} file - File path
 * @returns {Promise} - The fetched data
 * @throws {errorDownloadFile} - Throws error if any required arguments are missing
 */
export async function downloadFile(url: string, folder: string, file: string): Promise<any> {
  if (!url || !folder || !file) throw new Error(errorDownloadFile);

  const response = await fetch(url);
  if (response.status !== 200) return;

  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  return new Promise((resolve, reject) => {
    const PATH = `${folder}/${file}`;
    console.log(msgDownloadFileWritingFile(PATH));
    const _file = fs.createWriteStream(PATH);
    response.body.pipe(_file);
    _file.on('error', () => reject('Error when downloading file!'));
    _file.on('finish', () => resolve(PATH));
  });
}
