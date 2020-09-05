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
  const finish = () => console.log(MsgJobComplete);

  try {
    await createTokens(config, data);

    // Hack to ensure there has been some time to put tokens on disk
    const { syncElements, syncGraphics } = config;
    syncElements || syncGraphics ? setTimeout(sync, 1000) : finish();

    async function sync() {
      if (syncElements) await createElements(config, data);
      if (syncGraphics) await createGraphics(config, data);
      finish();
    }
  } catch (error) {
    throw new Error(error);
  }
}
