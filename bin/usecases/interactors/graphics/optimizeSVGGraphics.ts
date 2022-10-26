import { optimize } from 'svgo';
import { Config } from '../../../contracts/Config';
import { FileList } from '../../../contracts/Files';
import {
  ErrorOptimizeSVGGraphics,
  ErrorOptimizeSVGGraphicsConfig,
  ErrorOptimizeSVGGraphicsFormat
} from '../../../frameworks/errors/errors';
import { loadFile } from '../../../frameworks/filesystem/loadFile';
import { write } from '../../../frameworks/filesystem/write';

/**
 * @description Optimize SVG Graphics downloaded from Figma using svgo
 */
export async function optimizeSVGGraphics(fileList: FileList[], config: Config): Promise<void> {
  if (!fileList || !config) throw Error(ErrorOptimizeSVGGraphicsConfig);

  const { outputFormatGraphics, outputFolderGraphics } = config;

  if (outputFormatGraphics !== 'svg') throw Error(ErrorOptimizeSVGGraphicsFormat);

  await Promise.all(
    fileList.map(async (file: FileList) => {
      return new Promise(async (resolve) => {
        const svg = loadFile(`${outputFolderGraphics}/${file.file}`);
        if (typeof svg !== 'string') {
          throw Error(ErrorOptimizeSVGGraphics(`Invalid SVG file: ${file.file}`));
        }
        const result = optimize(svg, {
          multipass: true,
          plugins: [
            'preset-default',
            {
              name: 'removeViewBox',
              active: false
            },
            {
              name: 'reusePaths',
              active: true
            }
          ],
          js2svg: {
            indent: 2,
            pretty: true
          }
        });
        if (result.error !== undefined) {
          throw Error(ErrorOptimizeSVGGraphics(result.error));
        }
        const optimizedSvgString = result.data;
        await write(`${outputFolderGraphics}/${file.file}`, optimizedSvgString);
        resolve(true);
      });
    })
  );
}
