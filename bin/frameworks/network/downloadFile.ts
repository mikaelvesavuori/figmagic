import fetch from 'node-fetch';
import * as fs from 'fs';

import { MsgDownloadFileWritingFile } from '../messages/messages';
import { ErrorDownloadFile } from '../errors/errors';
import { createFolder } from '../filesystem/createFolder';

/**
 * @description Get data from API
 *
 * @param url URL path
 * @param folder Folder path
 * @param file File path
 */
export async function downloadFile(url: string, folder: string, file: string): Promise<any> {
  if (!url || !folder || !file) throw new Error(ErrorDownloadFile);

  const response = await fetch(url);
  if (response.status !== 200) return;

  await createFolder(folder);

  return new Promise((resolve, reject) => {
    const PATH = `${folder}/${file}`;
    console.log(MsgDownloadFileWritingFile(PATH));
    const _file = fs.createWriteStream(PATH);
    response.body.pipe(_file);
    _file.on('error', () => reject('Error when downloading file!'));
    _file.on('finish', () => resolve(PATH));
  });
}
