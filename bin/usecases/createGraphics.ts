import { FigmaData } from '../app/contracts/FigmaData';
import { Config } from '../entities/Config/Config';

import { doSyncGraphics } from '../app/sync/doSyncGraphics';

import { ErrorCreateGraphics } from '../frameworks/errors/errors';

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
  if (!config || !data || !outputFolderGraphics) throw new Error(ErrorCreateGraphics);
  return await doSyncGraphics(config, data, outputFolderGraphics);
}
