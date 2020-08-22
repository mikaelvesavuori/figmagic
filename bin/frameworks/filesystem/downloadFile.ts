import fetch from 'node-fetch';
import * as fs from 'fs';

import { msgDownloadFileWritingFile } from '../messages/messages';
import { errorDownloadFile } from '../errors/errors';

/**
 * @description Get data from API
 *
 * @param url URL path
 * @param folder Folder path
 * @param file File path
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
