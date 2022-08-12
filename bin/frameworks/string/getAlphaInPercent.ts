import { ErrorGetAlphaInPercent } from '../../frameworks/errors/errors';

/**
 * @description Get RGBA alpha value as a percentage string
 */
export const getAlphaInPercent = (color: string): string => {
  if (!color) throw Error(ErrorGetAlphaInPercent);
  const sectioned = color.split(',');
  // @ts-ignore
  return sectioned[sectioned.length - 1].replace(/ /gi, '').replace(')', '') * 100 + '%';
};
