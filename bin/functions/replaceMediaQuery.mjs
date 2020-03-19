export function replaceMediaQuery(str, match) {
  const index = str.indexOf(match);
  if (index === -1) return str;

  // Set media query, assume only "upto" or "min"
  const QUERY_TYPE = match === '@upto' ? 'max' : 'min';

  // Get the right parts
  // TODO: Looks like shit, but seems to work at least
  const SLICE_START = parseInt(match.length + 1);
  const SLICE_LENGTH = SLICE_START + 6;
  let query = str.slice(index, index + SLICE_LENGTH);
  let size = query.slice(SLICE_START, SLICE_LENGTH);

  console.log('query', query);
  console.log('size', size);

  // If match was too greedy
  size.replace(/![0-9]/gi, '');
  console.log('fixed size: ', size);
  /*
  if (size.includes('{')) {
    size = size.replace('{', '');
    console.log('size', size, str);
	}
	*/

  // Remove any spaces
  size = size.trim();

  str = str.replace(match, `@media query and (${QUERY_TYPE}-width: ${size}px) {`); // TODO: Will this work globally across string?

  // Clean up the remainder
  const REMAINDER = query.replace(match, '');
  console.log('REMAINDER', REMAINDER);
  str = str.replace(REMAINDER, '');

  return str;
}
