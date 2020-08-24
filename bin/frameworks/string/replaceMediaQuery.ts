import { ErrorReplaceMediaQuery } from '../errors/errors';

/**
 * @description Replace media query sugar syntax from Figma description block
 *
 * @param str String from Figma description block
 * @param match Matching string (regex?)
 */
export function replaceMediaQuery(str: string, match: string): string {
  if (!str || !match) throw new Error(ErrorReplaceMediaQuery);

  const index = str.indexOf(match);
  if (index === -1) return str;

  // Set media query, assume only "upto" or "min"
  const QUERY_TYPE = match === '@upto' ? 'max' : 'min';

  // Get the right parts
  const SLICE_START = match.length + 1;
  const SLICE_LENGTH = SLICE_START + 6;
  let query = str.slice(index, index + SLICE_LENGTH);
  let size = query.slice(SLICE_START, SLICE_LENGTH);
  const REMAINDER = query.replace(match, '');

  // If match was too greedy
  size.replace(/![0-9]/gi, '').trim();

  return str
    .replace(match, `@media query and (${QUERY_TYPE}-width: ${size}px) {`)
    .replace(REMAINDER, '');
}
