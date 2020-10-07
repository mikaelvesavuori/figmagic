import { ErrorCheckIfStringOnlyContainsReturnsOrSpaces } from '../../../bin/frameworks/errors/errors';

/**
 * @description TODO
 */
export function checkIfStringOnlyContainsReturnsOrSpaces(str: string): boolean {
  if (!str) throw new Error(ErrorCheckIfStringOnlyContainsReturnsOrSpaces);

  const HAS_RETURNS = str.match(/\n/gi);
  const HAS_SPACES = str.match(/ /gi);
  if (HAS_RETURNS && HAS_SPACES) return false;

  str = str.replace(/\n/gi, '').replace(/ /gi, '');
  if (str.length > 0) return false;
  return true;
}
