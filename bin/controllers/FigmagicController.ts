import { FigmaData } from '../domain/FigmaData/FigmaData';

import { Config } from '../app/contracts/config/Config';

import { doSyncElements } from '../app/main/doSyncElements';
import { doSyncGraphics } from '../app/main/doSyncGraphics';
import { getDataLocal } from '../app/main/getDataLocal';
import { getDataRemote } from '../app/main/getDataRemote';
import { writeBaseJson } from '../app/main/writeBaseJson';
import { processTokens } from '../app/main/processTokens';

import { msgJobComplete } from '../frameworks/messages/messages';

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

  const data: FigmaData = recompileLocal
    ? await getDataLocal(outputFolderBaseFile, outputFileName)
    : await getDataRemote(token, url);

  if (!recompileLocal) await writeBaseJson(outputFolderBaseFile, outputFileName, data);

  await processTokens(config, data, outputFolderTokens);

  if (syncElements) await doSyncElements(config, data, outputFolderElements);
  if (syncGraphics) await doSyncGraphics(config, data, outputFolderGraphics);

  console.log(msgJobComplete);
}
