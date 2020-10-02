import fetch from 'node-fetch';
import * as fs from 'fs';

import { MsgDownloadFileWritingFile } from '../messages/messages';
import { ErrorDownloadFile } from '../errors/errors';

/**
 * @description Get data from API
 */
export async function downloadFile(url: string, path: string): Promise<void> {
  try {
    if (!url || !path) throw new Error(ErrorDownloadFile);

    const RESPONSE = await fetch(url);
    if (RESPONSE.status !== 200) return;

    return new Promise((resolve, reject) => {
      console.log(MsgDownloadFileWritingFile(path));
      const FILE = fs.createWriteStream(path);
      RESPONSE.body.pipe(FILE);
      FILE.on('error', () => reject('Error when downloading file!'));
      FILE.on('finish', () => resolve());
    });
  } catch (error) {
    throw new Error(error);
  }
}
