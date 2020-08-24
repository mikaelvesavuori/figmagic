import { FigmaData } from '../entities/FigmaData/FigmaData';
import { Config } from '../entities/Config/Config';
import { Page } from '../entities/Page/Page';

import { createPage } from '../app/process/createPage';

import { refresh } from '../frameworks/filesystem/refresh';
import { writeTokens } from '../frameworks/filesystem/writeTokens';
import { MsgWriteTokens } from '../frameworks/messages/messages';

/**
 * @description TODO
 *
 * @param config TODO
 * @param data TODO
 * @param outputFolder TODO
 */
export async function createTokens(
  config: Config,
  data: FigmaData,
  outputFolder: string
): Promise<void> {
  //return await processTokens(config, data, outputFolderTokens);
  console.log(MsgWriteTokens);

  try {
    const tokensPage: Page[] = createPage(data.document.children, 'Design Tokens');
    await refresh(outputFolder);
    await writeTokens(tokensPage, config);
  } catch (error) {
    throw new Error(error);
  }
}
