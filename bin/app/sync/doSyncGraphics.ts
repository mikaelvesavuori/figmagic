import { Config } from '../../entities/Config/Config';
import { FigmaData } from '../contracts/FigmaData';

import { createPage } from '../process/createPage';
import { processGraphics } from '../process/processGraphics';

import { refresh } from '../../frameworks/filesystem/refresh';
import { writeGraphics } from '../../frameworks/filesystem/writeGraphics';
import { MsgSyncGraphics } from '../../frameworks/messages/messages';

/**
 * @description Sync graphics
 *
 * @param config User configuration
 * @param data Data from Figma
 * @param outputFolder Folder where elements should be generated
 */
export async function doSyncGraphics(
  config: Config,
  data: FigmaData,
  outputFolder: string
): Promise<void> {
  console.log(MsgSyncGraphics);

  try {
    const graphicsPage = createPage(data.document.children, 'Graphics');
    await refresh(outputFolder);
    const fileList = await processGraphics(graphicsPage, config);
    await writeGraphics(fileList, config);
  } catch (error) {
    throw new Error(error);
  }
}
