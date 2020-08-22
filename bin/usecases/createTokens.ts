import { FigmaData } from '../../entities/FigmaData/FigmaData';
import { Config } from '../contracts/config/Config';

import { processTokens } from '../main/processTokens';

export async function createTokens(config: Config, data: FigmaData, outputFolderTokens: string) {
  return await processTokens(config, data, outputFolderTokens);
}
