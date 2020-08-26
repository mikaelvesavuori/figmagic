import { FigmaData } from '../app/contracts/FigmaData';
import { Config } from '../entities/Config/Config';

import { doSyncElements } from '../app/sync/doSyncElements';

/**
 * @description Use case for syncing (creating) React elements from Figma files
 *
 * @param config User configuration
 * @param data Data from Figma
 * @param outputFolderElements Folder where elements should be generated
 */
export async function createElements(
  config: Config,
  data: FigmaData,
  outputFolderElements: string
): Promise<any> {
  return await doSyncElements(config, data, outputFolderElements);
}
