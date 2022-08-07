import fs from 'fs';
import https from 'https';

import { createMissingFoldersFromPath } from '../filesystem/createMissingFoldersFromPath';

import { ErrorDownloadFile } from '../errors/errors';

/**
 * @description Get data from API
 */
export async function downloadFile(url: string, filePath: string): Promise<void> {
  if (!url || !filePath) throw Error(ErrorDownloadFile);

  return new Promise((resolve, reject) => {
    const req = https.get(url, (resp) => {
      // @ts-ignore
      if (resp.statusCode >= 200 && resp.statusCode < 300) {
        createMissingFoldersFromPath(filePath);
        const write = resp.pipe(fs.createWriteStream(filePath));
        write.on('finish', resolve);
      } else reject(null);
    });
    req.on('end', () => resolve()).on('error', (error) => reject(error));
  });
}
