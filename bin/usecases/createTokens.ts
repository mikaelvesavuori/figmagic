import { FigmaData } from '../../entities/FigmaData/FigmaData';
import { Config } from '../contracts/config/Config';

import { processTokens } from '../main/processTokens';

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
