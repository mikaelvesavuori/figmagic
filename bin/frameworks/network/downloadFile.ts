import fetch from 'node-fetch';
import * as fs from 'fs';

import { createFolder } from '../filesystem/createFolder';

import { MsgDownloadFileWritingFile } from '../messages/messages';
import { ErrorDownloadFile } from '../errors/errors';

/**
 * @description Get data from API
 *
 * @param url URL path
 * @param folder Folder path
 * @param file File path
 */
// TODO: Add real return type
export async function downloadFile(url: string, folder: string, file: string): Promise<any> {
  if (!url || !folder || !file) throw new Error(ErrorDownloadFile);

  const response = await fetch(url);
  if (response.status !== 200) return;

  createFolder(folder);

  return new Promise((resolve, reject) => {
    const path = `${folder}/${file}`;
    console.log(MsgDownloadFileWritingFile(path));
    const _file = fs.createWriteStream(path);
    response.body.pipe(_file);
    _file.on('error', () => reject('Error when downloading file!'));
    _file.on('finish', () => resolve(path));
  }).catch((error) => {
    throw new Error(error);
  });
}
