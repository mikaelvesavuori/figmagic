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
  data: any
): Promise<any> {
  console.log(MsgWriteBaseFile);
  try {
    await refresh(outputFolderBaseFile);

    const path = `${outputFolderBaseFile}/${outputFileName}`;

    await write(path, outputFolderBaseFile);

    /*
    const op = {
      type: 'raw',
      file: outputFolderBaseFile,
      path: string,
      name: outputFileName
    };

    // data, outputFolderBaseFile, outputFileName, 'raw'

    //await writeFile(op);
    */

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
