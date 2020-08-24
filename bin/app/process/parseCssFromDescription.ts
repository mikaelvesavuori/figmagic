import { replaceMediaQuery } from '../../frameworks/string/replaceMediaQuery';

import { ErrorParseCssFromDescription } from '../../../app/errors/errors';

// TODO: Refactor

/**
 * @description Parse CSS from Figma description block
 *
 * @param desc String with description
 * @param tokens Array of design tokens
 */
export function parseCssFromDescription(desc: string = '', tokens: any[]): object | string {
  if (!tokens) throw new Error(ErrorParseCssFromDescription);

  if (desc === '') return '';

  let metadata = {
    element: 'div'
  };

  // Remove newlines
  desc = desc.replace(/\n/gi, '');

  // Find and replace elements
  if (desc.match(/\{\{(.*?)\}\}/)) metadata.element = desc.match(/\{\{(.*?)\}\}/)[1];

  // Fix media queries
  if (desc.includes('@min')) desc = replaceMediaQuery(desc, '@min');
  if (desc.includes('@upto')) desc = replaceMediaQuery(desc, '@upto');

  // Find all tokens using "#" character
  let matches,
    replacedMatches = [];
  let regex = /(?:^|\s)(#[a-z0-9]\w*)/gi;
  while ((matches = regex.exec(desc))) {
    replacedMatches.push(matches[1]);
  }

  replacedMatches.forEach((token) => {
    const _TOKEN = token.slice(1, token.length);

    tokens.forEach((frame) => {
      const FRAME_NAME = Object.keys(frame);

      const MATCH = (Object.entries(frame[`${FRAME_NAME}`]) as [string, unknown]).find((item) => {
        if (item[0] === _TOKEN) {
          return item[1];
        }
      });

      if (!MATCH) return;

      desc = desc.replace(token, MATCH[1]);
    });
  });

  return {
    cssString: desc,
    metadata
  };
}
