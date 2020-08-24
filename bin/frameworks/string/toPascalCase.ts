import { ErrorToPascalCase } from '../../app/errors/errors';

/**
 * @description Pascal-case transform a string
 *
 * @param str The string to Pascal case
 */
export function toPascalCase(str: string): string {
  if (!str) throw new Error(ErrorToPascalCase);

  return str
    .replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .replace(/\s+/g, '');
}
