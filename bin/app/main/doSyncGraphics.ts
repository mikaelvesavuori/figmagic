import { Config } from '../contracts/config/Config';
import { FigmaData } from '../../domain/FigmaData/FigmaData';

import { refresh } from '../../frameworks/filesystem/refresh';

import { createPage } from '../../functions/process/createPage';
import { processGraphics } from '../../functions/process/processGraphics';
import { writeGraphics } from '../../functions/filesystem/writeGraphics';

import { msgSyncGraphics } from '../../frameworks/messages/messages';

/**
 * @description TODO
 *
 * @param config
 * @param data
 * @param outputFolder
 */
export async function doSyncGraphics(
  config: Config,
  data: FigmaData,
  outputFolder: string
): Promise<void> {
  console.log(msgSyncGraphics);
  try {
    const graphicsPage = createPage(data.document.children, 'Graphics');
    await refresh(outputFolder);
    const fileList = await processGraphics(graphicsPage, config);
    await writeGraphics(fileList, config);
  } catch (error) {
    throw new Error(error);
  }
}
