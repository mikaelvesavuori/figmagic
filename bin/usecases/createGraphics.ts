import { FigmaData } from '../../entities/FigmaData/FigmaData';
import { Config } from '../contracts/config/Config';

import { doSyncGraphics } from '../main/doSyncGraphics';

export async function createGraphics(
  config: Config,
  data: FigmaData,
  outputFolderElements: string
) {
  return await doSyncGraphics(config, data, outputFolderElements);
}
