import { FigmaData } from '../app/contracts/FigmaData';
import { Config } from '../entities/Config/Config';
import { FRAME as Frame } from '../app/contracts/Figma';

import { createPage } from '../app/process/tokens/createPage';

import { refresh } from '../frameworks/filesystem/refresh';
import { writeTokens } from '../frameworks/filesystem/writeTokens';
import { MsgWriteTokens } from '../frameworks/messages/messages';

/**
 * @description Use case for creating token files from Figma
 *
 * @param config User configuration
 * @param data Data from Figma
 * @param outputFolder Folder where tokens should be generated
 */
export async function createTokens(
  config: Config,
  data: FigmaData,
  outputFolder: string
): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    console.log(MsgWriteTokens);
    try {
      const tokensPage: Frame[] = createPage(data.document.children, 'Design Tokens');
      await refresh(outputFolder);
      await writeTokens(tokensPage, config);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}
