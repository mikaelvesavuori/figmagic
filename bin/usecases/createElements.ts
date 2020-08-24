import { FigmaData } from '../entities/FigmaData/FigmaData';
import { Config } from '../entities/Config/Config';

import { doSyncElements } from '../app/main/doSyncElements';

/**
 * @description TODO
 * @param config TODO
 * @param data TODO
 * @param outputFolderElements TODO
 */
export async function createElements(
  config: Config,
  data: FigmaData,
  outputFolderElements: string
) {
  return await doSyncElements(config, data, outputFolderElements);
}
