import { FigmaData } from '../../entities/FigmaData/FigmaData';

import { Config } from '../contracts/config/Config';

import { doSyncElements } from '../main/doSyncElements';
import { doSyncGraphics } from '../main/doSyncGraphics';
import { getDataLocal } from '../main/getDataLocal';
import { getDataRemote } from '../main/getDataRemote';
import { writeBaseJson } from '../main/writeBaseJson';
import { processTokens } from '../main/processTokens';

import { createTokens } from '../../usecases/createTokens';
import { createElements } from '../../usecases/createElements';
import { createGraphics } from '../../usecases/createGraphics';

import { msgJobComplete } from '../../frameworks/messages/messages';

/**
 * @description TODO
 *
 * @param config
 */
export async function FigmagicController(config: Config): Promise<void> {
  const {
    token,
    url,
    recompileLocal,
    syncGraphics,
    syncElements,
    outputFolderBaseFile,
    outputFolderTokens,
    outputFolderGraphics,
    outputFolderElements,
    outputFileName
  } = config;

  const data = await getData(recompileLocal, outputFolderBaseFile, outputFileName, token, url);

  if (!recompileLocal) await writeBaseJson(outputFolderBaseFile, outputFileName, data);

  await createTokens(config, data, outputFolderTokens);

  if (syncElements) await createElements(config, data, outputFolderElements);
  if (syncGraphics) await createGraphics(config, data, outputFolderGraphics);

  console.log(msgJobComplete);
}

async function getData(
  recompileLocal: boolean,
  outputFolderBaseFile: string,
  outputFileName: string,
  token: string | null,
  url: string | null
): Promise<FigmaData> {
  return recompileLocal
    ? await getDataLocal(outputFolderBaseFile, outputFileName)
    : await getDataRemote(token, url);
}
