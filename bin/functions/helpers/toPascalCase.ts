import { errorToPascalCase } from '../../frameworks/errors/errors';

/**
 * @description Pascal-case transform a string
 *
 * @param str The string to Pascal case
 */
export function toPascalCase(str: string): string {
  if (!str) throw new Error(errorToPascalCase);

  let recasedString = str.replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());

  // TODO: Chain this...?
  recasedString = recasedString.replace(/\s+/g, '');

  return recasedString;
}
