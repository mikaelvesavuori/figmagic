import { Graphic } from '../../../contracts/Graphic';

import { ErrorProcessGraphicElementsMap } from '../../../frameworks/errors/errors';
/**
 * @description Create raw file content for the graphic elements index/map file
 */
export function processGraphicElementsMap(graphics: any[]): any {
  if (!graphics) throw Error(ErrorProcessGraphicElementsMap);
  if (!(graphics.length > 0)) throw Error(ErrorProcessGraphicElementsMap);

  let imports = '';
  graphics.forEach((graphic: Graphic) => {
    const graphicName = getFixedGraphicName(graphic.name);
    imports += `import ${graphicName} from './${
      graphic.config.outputFolderElements
    }/${graphic.name.replace(/\s/g, '')}';\n`;
  });
  imports += '\n';

  let exports = '';
  graphics.forEach((graphic: Graphic) => {
    const graphicName = getFixedGraphicName(graphic.name);
    exports += `  ${graphicName},\n`;
  });

  return imports + `export const Graphics = {\n${exports}};\n`;
}

// Get and use last part of name
const getFixedGraphicName = (name: any) =>
  name.split('/')[name.split('/').length - 1].trim().replace(/\s/g, '');
