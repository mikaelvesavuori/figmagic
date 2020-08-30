import { refresh } from './refresh';
//import { writeFile } from './writeFile';
import { write } from './write';

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
  data: object
): Promise<void> {
  console.log(MsgWriteBaseFile);
  try {
    await refresh(outputFolderBaseFile);
    const filePath = `${outputFolderBaseFile}/${outputFileName}`;
    await write(filePath, JSON.stringify(data));
  } catch (error) {
    throw new Error(error);
  }
}
