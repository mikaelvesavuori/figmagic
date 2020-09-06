import { FigmaData } from '../contracts/FigmaData';
import { Config } from '../contracts/Config';
import { FRAME as Frame } from '../contracts/Figma';

import { createPage } from './interactors/common/createPage';

import { refresh } from '../frameworks/filesystem/refresh';
import { writeTokens } from './interactors/tokens/writeTokens';

import { MsgWriteTokens } from '../frameworks/messages/messages';
import { ErrorCreateTokens } from '../frameworks/errors/errors';

/**
 * @description Use case for creating token files from Figma
 *
 * @param config User configuration
 * @param data Data from Figma
 */
export async function createTokens(config: Config, data: FigmaData): Promise<boolean> {
  if (!config || !data) throw new Error(ErrorCreateTokens);

  return new Promise(async (resolve) => {
    console.log(MsgWriteTokens);
    try {
      await refresh(config.outputFolderTokens);
      const tokensPage: Frame[] = createPage(data.document.children, 'Design Tokens');
      await writeTokens(tokensPage, config); // TODO: Reverse the naming/structure of writeTokens <--> processTokens to be in line with other usecases
      resolve(true);
    } catch (error) {
      throw new Error(error);
    }
  });
}
