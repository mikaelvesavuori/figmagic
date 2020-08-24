import { Config } from '../../entities/Config/Config';

import { createTokens } from '../../usecases/createTokens';
import { createElements } from '../../usecases/createElements';
import { createGraphics } from '../../usecases/createGraphics';

import { MsgJobComplete } from '../../frameworks/messages/messages';

/**
 * @description TODO
 *
 * @param config asdf
 * @param data asdf
 */
// TODO: Fix real type
export async function FigmagicController(config: Config, data: any): Promise<void> {
  const {
    syncGraphics,
    syncElements,
    outputFolderTokens,
    outputFolderGraphics,
    outputFolderElements
  } = config;

  await createTokens(config, data, outputFolderTokens);

  if (syncElements) await createElements(config, data, outputFolderElements);
  if (syncGraphics) await createGraphics(config, data, outputFolderGraphics);

  console.log(MsgJobComplete);
}
