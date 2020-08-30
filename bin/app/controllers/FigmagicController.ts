import { Config } from '../../entities/Config/Config';

import { createTokens } from '../../usecases/createTokens';
//import { createElements } from '../../usecases/createElements';
import { createGraphics } from '../../usecases/createGraphics';

import { MsgJobComplete } from '../../frameworks/messages/messages';

/**
 * @description The main orchestration/controller point for Figmagic
 *
 * @param config User configuration object
 * @param data Data should be processed and output to file(s)
 */
export async function FigmagicController(config: Config, data: any): Promise<boolean> {
  try {
    const {
      //outputFolderElements,
      outputFolderGraphics,
      outputFolderTokens,
      //syncElements,
      syncGraphics
    } = config;

    await createTokens(config, data, outputFolderTokens);

    //if (syncElements) await createElements(config, data, outputFolderElements);
    if (syncGraphics) await createGraphics(config, data, outputFolderGraphics);

    console.log(MsgJobComplete);
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
