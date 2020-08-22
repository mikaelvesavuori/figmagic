import { refresh } from '../filesystem/refresh';
import { writeFile } from '../filesystem/writeFile';

import { msgWriteBaseFile } from '../messages/messages';

/**
 * @description TODO
 *
 * @param outputFolderBaseFile
 * @param outputFileName
 * @param data
 */
// TODO: Add proper return type
export async function writeBaseJson(
  outputFolderBaseFile: string,
  outputFileName: string,
  data: object
): Promise<object> {
  console.log(msgWriteBaseFile);
  try {
    await refresh(outputFolderBaseFile);
    await writeFile(JSON.stringify(data), outputFolderBaseFile, outputFileName, 'raw');

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
