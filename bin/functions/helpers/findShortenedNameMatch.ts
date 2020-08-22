import {
  errorFindShortenedNameMatchString,
  errorFindShortenedNameMatchOriginal,
  errorFindShortenedNameMatchWrongType
} from '../../frameworks/errors/errors';

/**
 * @description Find short name match
 *
 * @param originalString The original string
 * @param matchString String to match with
 */
export function findShortenedNameMatch(originalString: string, matchString: string): boolean {
  if (!originalString) throw new Error(errorFindShortenedNameMatchOriginal);
  if (!matchString) throw new Error(errorFindShortenedNameMatchString);
  if (typeof originalString !== 'string' && typeof matchString !== 'string')
    throw new Error(errorFindShortenedNameMatchWrongType);

  return originalString.toLowerCase().replace(' /g', '') === matchString;
}
