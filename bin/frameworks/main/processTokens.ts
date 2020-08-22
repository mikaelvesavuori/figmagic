import { Config } from '../../app/contracts/config/Config';
import { FigmaData } from '../../entities/FigmaData/FigmaData';
import { Page } from '../../entities/Page/Page';

import { refresh } from '../filesystem/refresh';
import { writeTokens } from '../filesystem/writeTokens';
import { createPage } from '../../functions/process/createPage';

import { msgWriteTokens } from '../messages/messages';

/**
 * @description TODO
 *
 * @param config
 * @param data
 * @param outputFolder
 */
export async function processTokens(
  config: Config,
  data: FigmaData,
  outputFolder: string
): Promise<void> {
  console.log(msgWriteTokens);
  try {
    const tokensPage: Page[] = createPage(data.document.children, 'Design Tokens');
    await refresh(outputFolder);
    await writeTokens(tokensPage, config);
  } catch (error) {
    throw new Error(error);
  }
}
