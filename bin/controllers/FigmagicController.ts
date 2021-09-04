import { FigmaData } from '../contracts/FigmaData';
import { Config } from '../contracts/Config';

import { createTokens } from '../usecases/createTokens';
import { createElements } from '../usecases/createElements';
import { createGraphics } from '../usecases/createGraphics';

import { MsgJobComplete } from '../frameworks/messages/messages';
import { ErrorFigmagicController } from '../frameworks/errors/errors';

/**
 * @description The main orchestration/controller point for Figmagic
 */
export async function FigmagicController(config: Config, data: FigmaData): Promise<string> {
  try {
    if (!config || !data) throw Error(ErrorFigmagicController);

    if (config.syncGraphics) await createGraphics(config, data);
    if (config.syncTokens) await createTokens(config, data);
    if (config.syncElements) await createElements(config, data);

    console.log(MsgJobComplete);

    return MsgJobComplete;
  } catch (error: any) {
    throw Error(error);
  }
}
