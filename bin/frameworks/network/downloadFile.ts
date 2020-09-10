import fetch from 'node-fetch';
import * as fs from 'fs';

import { MsgDownloadFileWritingFile } from '../messages/messages';
import { ErrorDownloadFile } from '../errors/errors';

/**
 * @description Get data from API
 *
 * @param url URL path
 * @param path File path
 */
export async function downloadFile(url: string, path: string): Promise<void> {
  try {
    if (!url || !path) throw new Error(ErrorDownloadFile);

    console.log(url);
    console.log(path);

    const response = await fetch(url);
    if (response.status !== 200) return;

    return new Promise((resolve, reject) => {
      console.log(MsgDownloadFileWritingFile(path));
      const FILE = fs.createWriteStream(path);
      response.body.pipe(FILE);
      FILE.on('error', () => reject('Error when downloading file!'));
      FILE.on('finish', () => resolve());
    });
  } catch (error) {
    throw new Error(error);
  }
}
