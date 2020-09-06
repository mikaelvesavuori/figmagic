import { FigmaData } from '../contracts/FigmaData';
import { Config } from '../contracts/Config';

import { createPage } from './interactors/common/createPage';
import { processElements } from './interactors/elements/processElements';

import { createFolder } from '../frameworks/filesystem/createFolder';
import { writeElements } from './interactors/elements/writeElements';

import { MsgSyncElements } from '../frameworks/messages/messages';
import { ErrorCreateElements } from '../frameworks/errors/errors';

/**
 * @description Use case for syncing (creating) React elements from Figma files
 *
 * @param config User configuration
 * @param data Data from Figma
 */
export async function createElements(config: Config, data: FigmaData): Promise<void | unknown> {
  if (!config || !data) throw new Error(ErrorCreateElements);

  return new Promise(async (resolve) => {
    console.log(MsgSyncElements);
    try {
      const { components }: any = data;
      const elementsPage = createPage(data.document.children, 'Elements');
      const elements = await processElements(elementsPage, config, components).catch((error) =>
        console.error(error)
      );
      createFolder(config.outputFolderElements);
      // @ts-ignore
      await writeElements(elements, config);
      resolve(true);
    } catch (error) {
      throw new Error(error);
    }
  }).catch((error) => {
    throw new Error(error);
  });
}
