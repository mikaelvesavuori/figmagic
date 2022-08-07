import * as path from 'path';

import { FigmaData } from '../../contracts/FigmaData';

import { loadFile } from '../filesystem/loadFile';

import { MsgSetDataFromLocal } from '../messages/messages';
import { ErrorGetDataLocal } from '../errors/errors';

/**
 * @description Helper to get Figma data from local source
 */
export function getDataLocal(
  figmagicFolder: string,
  figmaData: string
): Record<string, unknown> | string | FigmaData {
  if (!figmagicFolder || !figmaData) throw Error(ErrorGetDataLocal);
  console.log(MsgSetDataFromLocal);
  return loadFile(path.join(`${figmagicFolder}`, `${figmaData}`));
}
