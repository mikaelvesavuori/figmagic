import * as fs from 'fs';
import https from 'https';

//import { request } from './request';

//import { MsgDownloadFileWritingFile } from '../messages/messages';
import { ErrorDownloadFile } from '../errors/errors';

/**
 * @description Get data from API
 */
export async function downloadFile(url: string, filePath: string): Promise<void> {
  try {
    if (!url || !filePath) throw new Error(ErrorDownloadFile);

    return new Promise((resolve, reject) => {
      const req = https.get(url, (resp) => {
        // @ts-ignore
        if (resp.statusCode >= 200 && resp.statusCode < 300) {
          resp.pipe(fs.createWriteStream(filePath));
          resolve();
        } else reject(null);
      });
      req.on('end', () => resolve()).on('error', (error) => reject(error));
    });
  } catch (error: any) {
    throw new Error(error);
  }
}
