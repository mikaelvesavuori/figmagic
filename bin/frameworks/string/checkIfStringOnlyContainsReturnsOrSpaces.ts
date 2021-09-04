import { ErrorCheckIfStringOnlyContainsReturnsOrSpaces } from '../../../bin/frameworks/errors/errors';

/**
 * @description Helper to see if a string has no actual content, i.e. only returns or spaces.
 */
export function checkIfStringOnlyContainsReturnsOrSpaces(str: string): boolean {
  if (!str) throw Error(ErrorCheckIfStringOnlyContainsReturnsOrSpaces);

  const HAS_RETURNS = str.match(/\n/gi);
  const HAS_SPACES = str.match(/ /gi);
  if (HAS_RETURNS && HAS_SPACES) return false;

  str = str.replace(/\n/gi, '').replace(/ /gi, '');
  if (str.length > 0) return false;
  return true;
}
