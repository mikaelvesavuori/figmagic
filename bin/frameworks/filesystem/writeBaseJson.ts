import { refresh } from './refresh';
import { writeFile } from './writeFile';

import { MsgWriteBaseFile } from '../../app/messages/messages';

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
  console.log(MsgWriteBaseFile);
  try {
    await refresh(outputFolderBaseFile);
    await writeFile(JSON.stringify(data), outputFolderBaseFile, outputFileName, 'raw');

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
