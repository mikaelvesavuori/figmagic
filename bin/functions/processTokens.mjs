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
 * @throws {Error} - When missing sheet or name
 */
export function processTokens(sheet, name, settings) {
  if (sheet && name) {
    const _name = name.toLowerCase();
    let processedTokens = undefined;

    // Design tokens
    if (_name === 'color' || _name === 'colour' || _name === 'colors' || _name === 'colours') {
      processedTokens = setupColorTokens(sheet);
    }
    if (_name === 'spacing' || _name === 'spacings') {
      processedTokens = setupSpacingTokens(sheet, settings.spacingUnit);
    }
    if (_name === 'fontfamily' || _name === 'fontfamilies') {
      processedTokens = setupFontTokens(sheet, settings.usePostscriptFontNames);
    }
    if (_name === 'fontsize' || _name === 'fontsizes') {
      processedTokens = setupFontSizeTokens(sheet, settings.fontUnit);
    }
    if (_name === 'fontweight' || _name === 'fontweights') {
      processedTokens = setupFontWeightTokens(sheet);
    }
    if (_name === 'lineheight' || _name === 'lineheights') {
      processedTokens = setupLineHeightTokens(sheet);
    }

    return processedTokens;
  } else {
    throw new Error(errorProcessTokens);
  }
}
