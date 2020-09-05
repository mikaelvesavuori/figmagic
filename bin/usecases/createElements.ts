import { FigmaData } from '../contracts/FigmaData';
import { Config } from '../contracts/Config';

import { createPage } from './interactors/common/createPage';
import { processElements } from './interactors/elements/processElements';

import { createFolder } from '../frameworks/filesystem/createFolder';
import { writeElements } from '../frameworks/filesystem/writeElements';

import { MsgSyncElements } from '../frameworks/messages/messages';
import { ErrorCreateElements } from '../frameworks/errors/errors';

/**
 * @description Use case for syncing (creating) React elements from Figma files
 *
 * @param config User configuration
 * @param data Data from Figma
 */
export async function createElements(config: Config, data: FigmaData): Promise<void> {
  if (!config || !data) throw new Error(ErrorCreateElements);

  return new Promise(async (resolve, reject) => {
    console.log(MsgSyncElements);
    try {
      const { components }: any = data;
      const elementsPage = createPage(data.document.children, 'Elements');
      const elements = await processElements(elementsPage, config, components);
      await createFolder(config.outputFolderElements);
      await writeElements(elements, config);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
