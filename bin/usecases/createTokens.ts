import { FigmaData } from '../app/contracts/FigmaData';
import { Config } from '../entities/Config/Config';
import { Frame } from '../app/contracts/Frame';

import { createPage } from '../app/process/createPage';

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
): Promise<void> {
  console.log(MsgWriteTokens);

  try {
    const tokensPage: Frame[] = createPage(data.document.children, 'Design Tokens');
    await refresh(outputFolder);
    await writeTokens(tokensPage, config);
  } catch (error) {
    throw new Error(error);
  }
}
