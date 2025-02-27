import * as path from 'path';

import { FigmaResponse } from '../../contracts/FigmaData';

import { loadFile } from '../filesystem/loadFile';

import { ErrorGetDataLocal } from '../errors/errors';
import { MsgSetDataFromLocal } from '../messages/messages';

/**
 * @description Helper to get Figma data from local source
 */
export function getDataLocal(
  figmagicFolder: string,
  figmaData: string,
): FigmaResponse {
  if (!figmagicFolder || !figmaData) throw Error(ErrorGetDataLocal);
  console.log(MsgSetDataFromLocal);
  return loadFile(
    path.join(`${figmagicFolder}`, `${figmaData}`),
  ) as FigmaResponse;
}
