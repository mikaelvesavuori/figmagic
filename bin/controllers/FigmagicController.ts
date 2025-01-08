import { Config } from '../contracts/Config';
import { FigmaData } from '../contracts/FigmaData';

import { createElements } from '../usecases/createElements';
import { createGraphics } from '../usecases/createGraphics';
import { createTokens } from '../usecases/createTokens';

import { ErrorFigmagicController } from '../frameworks/errors/errors';
import { MsgJobComplete } from '../frameworks/messages/messages';

/**
 * @description The main orchestration/controller point for Figmagic
 */
export async function FigmagicController(
  config: Config,
  data: FigmaData,
): Promise<string> {
  if (!config || !data) throw Error(ErrorFigmagicController);

  if (config.syncGraphics) await createGraphics(config, data);
  if (config.syncTokens) await createTokens(config, data);
  if (config.syncElements) await createElements(config, data);

  console.log(MsgJobComplete);

  return MsgJobComplete;
}
