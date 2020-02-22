import { setupColorTokens } from './setupColorTokens.mjs';
import { setupSpacingTokens } from './setupSpacingTokens.mjs';
import { setupFontTokens } from './setupFontTokens.mjs';
import { setupFontSizeTokens } from './setupFontSizeTokens.mjs';
import { setupFontWeightTokens } from './setupFontWeightTokens.mjs';
import { setupLineHeightTokens } from './setupLineHeightTokens.mjs';

import { errorProcessTokens } from '../meta/errors.mjs';

/**
 * Process tokens
 *
 * @exports
 * @function
 * @param {object} sheet - Sheet object from Figma
 * @param {string} name - Token name
 * @param {object} settings - User configuration object
 * @returns
 * @throws {error} - When missing sheet or name
 */
export function processTokens(sheet, name, settings) {
  if (sheet && name) {
    const _NAME = name.toLowerCase();
    let processedTokens = undefined;

    // Design tokens
    if (_NAME === 'color' || _NAME === 'colour' || _NAME === 'colors' || _NAME === 'colours') {
      processedTokens = setupColorTokens(sheet);
    }
    if (_NAME === 'spacing' || _NAME === 'spacings') {
      processedTokens = setupSpacingTokens(sheet, settings.spacingUnit);
    }
    if (_NAME === 'fontfamily' || _NAME === 'fontfamilies') {
      processedTokens = setupFontTokens(sheet, settings.usePostscriptFontNames);
    }
    if (_NAME === 'fontsize' || _NAME === 'fontsizes') {
      processedTokens = setupFontSizeTokens(sheet, settings.fontUnit);
    }
    if (_NAME === 'fontweight' || _NAME === 'fontweights') {
      processedTokens = setupFontWeightTokens(sheet);
    }
    if (_NAME === 'lineheight' || _NAME === 'lineheights') {
      processedTokens = setupLineHeightTokens(sheet);
    }

    return processedTokens;
  } else {
    throw new Error(errorProcessTokens);
  }
}
