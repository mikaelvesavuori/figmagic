import { ErrorReplaceMediaQuery } from '../errors/errors';

/**
 * @description Replace media query sugar syntax from Figma description block
 */
export function replaceMediaQuery(str: string, match: string): string {
  if (!str || !match) throw new Error(ErrorReplaceMediaQuery);

  const INDEX = str.indexOf(match);
  if (INDEX === -1) return str;

  // Set media query, assume only "upto" or "min"
  const QUERY_TYPE = match === '@upto' ? 'max' : 'min';

  // Get the right parts
  const SLICE_START = match.length + 1;
  const SLICE_LENGTH = SLICE_START + 6;
  const QUERY = str.slice(INDEX, INDEX + SLICE_LENGTH);
  let size = QUERY.slice(SLICE_START, SLICE_LENGTH);
  const REMAINDER = QUERY.replace(match, '');

  // If match was too greedy
  size = size.replace(/![0-9]/gi, '').trim();

  return str
    .replace(match, `@media query and (${QUERY_TYPE}-width: ${size}px) {`)
    .replace(REMAINDER, '');
}
