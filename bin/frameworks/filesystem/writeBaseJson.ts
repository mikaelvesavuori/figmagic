import { FigmaData } from '../../contracts/FigmaData';
import { RefreshConfig } from '../../contracts/Refresh';

import { refresh } from './refresh';
import { write } from './write';

import { MsgWriteBaseFile } from '../messages/messages';
import { ErrorWriteBaseJson } from '../errors/errors';

/**
 * @description Write base Figma JSON document to disk
 */
export async function writeBaseJson(
  refreshConfig: RefreshConfig,
  figmaData: string,
  data: FigmaData | Record<string, unknown>
): Promise<void> {
  if (!refreshConfig || !figmaData || !data) throw Error(ErrorWriteBaseJson);

  console.log(MsgWriteBaseFile);
  try {
    const { figmagicFolder, refreshType } = refreshConfig;
    refresh(figmagicFolder, refreshType);
    write(`${figmagicFolder}/${figmaData}`, JSON.stringify(data));
  } catch (error: any) {
    throw Error(error);
  }
}
