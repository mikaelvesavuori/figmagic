import { FigmaData } from '../../entities/FigmaData/FigmaData';
import { Config } from '../contracts/config/Config';

import { doSyncElements } from '../main/doSyncElements';

export async function createElements(
  config: Config,
  data: FigmaData,
  outputFolderElements: string
) {
  return await doSyncElements(config, data, outputFolderElements);
}
