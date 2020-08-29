import { refresh } from './refresh';
import { writeFile } from './writeFile';

import { MsgWriteBaseFile } from '../messages/messages';

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
  data: any
): Promise<any> {
  console.log(MsgWriteBaseFile);
  try {
    await refresh(outputFolderBaseFile);
    await writeFile(data, outputFolderBaseFile, outputFileName, 'raw');

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
