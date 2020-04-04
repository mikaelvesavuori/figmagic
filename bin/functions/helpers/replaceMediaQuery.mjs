import { errorReplaceMediaQuery } from '../../meta/errors.mjs';

/**
 * Replace media query sugar syntax from Figma description block
 *
 * @exports
 * @function
 * @param {string} str - String from Figma description block
 * @param {string} match - Matching string (regex?)
 * @returns {string} - String with valid CSS
 * @throws {errorReplaceMediaQuery} - Throws error if missing str or match arguments
 */
export function replaceMediaQuery(str, match) {
  if (!str || !match) throw new Error(errorReplaceMediaQuery);

  const index = str.indexOf(match);
  if (index === -1) return str;

  // Set media query, assume only "upto" or "min"
  const QUERY_TYPE = match === '@upto' ? 'max' : 'min';

  // Get the right parts
  const SLICE_START = parseInt(match.length + 1);
  const SLICE_LENGTH = SLICE_START + 6;
  let query = str.slice(index, index + SLICE_LENGTH);
  let size = query.slice(SLICE_START, SLICE_LENGTH);

  // If match was too greedy
  size.replace(/![0-9]/gi, '');

  // Remove any spaces
  size = size.trim();

  // Will this work globally across string?
  str = str.replace(match, `@media query and (${QUERY_TYPE}-width: ${size}px) {`);

  // Clean up the remainder
  const REMAINDER = query.replace(match, '');
  str = str.replace(REMAINDER, '');

  return str;
}
