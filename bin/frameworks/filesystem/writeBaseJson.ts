import { FigmaData } from '../../contracts/FigmaData';

import { refresh } from './refresh';
import { write } from './write';

import { MsgWriteBaseFile } from '../messages/messages';
import { ErrorWriteBaseJson } from '../errors/errors';

/**
 * @description Write base Figma JSON document to disk
 */
export async function writeBaseJson(
  outputFolderBaseFile: string,
  outputFileName: string,
  data: FigmaData | Record<string, unknown>
): Promise<void> {
  if (!outputFolderBaseFile || !outputFileName || !data) throw new Error(ErrorWriteBaseJson);

  console.log(MsgWriteBaseFile);
  try {
    await refresh(outputFolderBaseFile);
    write(`${outputFolderBaseFile}/${outputFileName}`, JSON.stringify(data));
  } catch (error) {
    throw new Error(ErrorWriteBaseJson);
  }
}
