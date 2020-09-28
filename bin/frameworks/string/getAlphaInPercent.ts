import { ErrorGetAlphaInPercent } from '../../frameworks/errors/errors';

/**
 * @description Get RGBA alpha value as a percentage string
 */
export const getAlphaInPercent = (color: string): string => {
  if (!color) throw new Error(ErrorGetAlphaInPercent);
  const SECTIONED = color.split(',');
  // @ts-ignore
  return SECTIONED[SECTIONED.length - 1].replace(/ /gi, '').replace(')', '') * 100 + '%';
};
