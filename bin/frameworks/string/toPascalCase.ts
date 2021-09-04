import { ErrorToPascalCase } from '../errors/errors';

/**
 * @description Pascal-case transform a string
 */
export function toPascalCase(str: string): string {
  if (!str) throw Error(ErrorToPascalCase);

  return str
    .replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .replace(/\s+/g, '');
}
