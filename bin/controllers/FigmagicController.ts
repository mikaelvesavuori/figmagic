import { FigmaData } from '../contracts/FigmaData';
import { Config } from '../contracts/Config';

import { createTokens } from '../usecases/createTokens';
import { createElements } from '../usecases/createElements';
import { createGraphics } from '../usecases/createGraphics';

import { MsgJobComplete } from '../frameworks/messages/messages';

/**
 * @description The main orchestration/controller point for Figmagic
 *
 * @param config User configuration object
 * @param data Data should be processed and output to file(s)
 */
export async function FigmagicController(config: Config, data: FigmaData): Promise<any> {
  try {
    await createTokens(config, data);
    if (config.syncElements) await createElements(config, data);
    if (config.syncGraphics) await createGraphics(config, data);
    console.log(MsgJobComplete);
  } catch (error) {
    throw new Error(error);
  }
}
