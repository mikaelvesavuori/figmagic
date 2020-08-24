import { FigmaData } from '../app/contracts/FigmaData';
import { Config } from '../entities/Config/Config';

import { doSyncGraphics } from '../app/sync/doSyncGraphics';

/**
 * @description Use case for syncing (creating) graphics from Figma file
 *
 * @param config User configuration
 * @param data Data from Figma
 * @param outputFolderGraphics Folder where graphics should be generated
 */
export async function createGraphics(
  config: Config,
  data: FigmaData,
  outputFolderGraphics: string
): Promise<any> {
  return await doSyncGraphics(config, data, outputFolderGraphics);
}
