import { refresh } from './refresh';
//import { writeFile } from './writeFile';
import { write } from './write';

import { MsgWriteBaseFile } from '../messages/messages';
import { ErrorWriteBaseJson } from '../errors/errors';

/**
 * @description TODO
 *
 * @param outputFolderBaseFile TODO
 * @param outputFileName TODO
 * @param data TODO
 */
// TODO: Add proper types
export async function writeBaseJson(
  outputFolderBaseFile: string,
  outputFileName: string,
  data: object
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    if (!outputFolderBaseFile || !outputFileName || !data) throw new Error(ErrorWriteBaseJson);

    console.log(MsgWriteBaseFile);
    try {
      await refresh(outputFolderBaseFile);
      write(`${outputFolderBaseFile}/${outputFileName}`, JSON.stringify(data));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
