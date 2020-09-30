import { ErrorCleanSvgData } from '../../frameworks/errors/errors';

export function cleanSvgData(svgData: string): string {
  if (!svgData) throw new Error(ErrorCleanSvgData);
  return svgData.replace(/width="\w." /gi, '').replace(/height="\w." /gi, '');
}
