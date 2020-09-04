import { FigmaData } from '../contracts/FigmaData';
import { Config } from '../contracts/Config';
import { FRAME as Frame } from '../contracts/Figma';

import { createPage } from './usecaseInteractors/common/createPage';

import { refresh } from '../frameworks/filesystem/refresh';
import { writeTokens } from '../frameworks/filesystem/writeTokens';

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

  return new Promise(async (resolve, reject) => {
    console.log(MsgWriteTokens);
    try {
      await refresh(config.outputFolderTokens);
      const tokensPage: Frame[] = createPage(data.document.children, 'Design Tokens');
      await writeTokens(tokensPage, config);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}
