import {
  ErrorFindShortenedNameMatchString,
  ErrorFindShortenedNameMatchOriginal,
  ErrorFindShortenedNameMatchWrongType
} from '../errors/errors';

/**
 * @description Find short name match
 *
 * @param originalString The original string
 * @param matchString String to match with
 */
export function findShortenedNameMatch(originalString: string, matchString: string): boolean {
  if (!originalString) throw new Error(ErrorFindShortenedNameMatchOriginal);
  if (!matchString) throw new Error(ErrorFindShortenedNameMatchString);
  if (typeof originalString !== 'string' && typeof matchString !== 'string')
    throw new Error(ErrorFindShortenedNameMatchWrongType);

  return originalString.toLowerCase().replace(' /g', '') === matchString;
}
