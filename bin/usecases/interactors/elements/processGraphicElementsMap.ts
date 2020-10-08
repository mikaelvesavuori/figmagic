import { Graphic } from '../../../contracts/Graphic';

import { ErrorProcessGraphicElementsMap } from '../../../frameworks/errors/errors';
/**
 * @description Create raw file content for the graphic elements index/map file
 */
export function processGraphicElementsMap(graphics: any[]): any {
  try {
    if (!graphics) throw new Error(ErrorProcessGraphicElementsMap);
    if (!(graphics.length > 0)) throw new Error(ErrorProcessGraphicElementsMap);

    let imports = '';
    graphics.forEach((graphic: Graphic) => {
      imports += `import ${graphic.name} from './${graphic.config.outputFolderElements}/${graphic.name}';\n`;
    });
    imports += '\n';

    let exports = '';
    graphics.forEach((graphic: Graphic) => {
      exports += `  ${graphic.name},\n`;
    });

    return imports + `export const Graphics = {\n${exports}};\n`;
  } catch (error) {
    throw new Error(error);
  }
}
