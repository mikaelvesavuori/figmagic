import { FigmaData } from '../app/contracts/FigmaData';
import { Config } from '../entities/Config/Config';

import { ErrorCreateGraphics } from '../frameworks/errors/errors';

import { createPage } from '../app/process/tokens/createPage';
import { processGraphics } from '../app/process/processGraphics';

import { refresh } from '../frameworks/filesystem/refresh';
import { writeGraphics } from '../frameworks/filesystem/writeGraphics';
import { MsgSyncGraphics } from '../frameworks/messages/messages';

/**
 * @description Use case for syncing (creating) graphics from Figma file
 *
 * @param config User configuration
 * @param data Data from Figma
 * @param outputFolderGraphics Folder where graphics should be generated
 */
export async function createGraphics(
  config: Config,
  data: FigmaData,
  outputFolderGraphics: string
): Promise<void> {
  if (!config || !data || !outputFolderGraphics) throw new Error(ErrorCreateGraphics);

  console.log(MsgSyncGraphics);

  try {
    await refresh(outputFolderGraphics);
    const graphicsPage = createPage(data.document.children, 'Graphics');
    const fileList = await processGraphics(graphicsPage, config);
    await writeGraphics(fileList, config);
  } catch (error) {
    throw new Error(error);
  }
}
