import { FigmaData } from '../entities/FigmaData/FigmaData';
import { Config } from '../entities/Config/Config';

import { processTokens } from '../app/main/processTokens';

/**
 * @description TODO
 *
 * @param config TODO
 * @param data TODO
 * @param outputFolderTokens TODO
 */
// TODO: Add real type
export async function createTokens(
  config: Config,
  data: FigmaData,
  outputFolderTokens: string
): Promise<any> {
  return await processTokens(config, data, outputFolderTokens);
}
