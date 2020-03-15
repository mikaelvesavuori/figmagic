import { setupColorTokens } from './setupColorTokens.mjs';
import { setupSpacingTokens } from './setupSpacingTokens.mjs';
import { setupFontTokens } from './setupFontTokens.mjs';
import { setupFontSizeTokens } from './setupFontSizeTokens.mjs';
import { setupFontWeightTokens } from './setupFontWeightTokens.mjs';
import { setupLineHeightTokens } from './setupLineHeightTokens.mjs';
import { setupShadowTokens } from './setupShadowTokens.mjs';
import { setupBorderWidthTokens } from './setupBorderWidthTokens.mjs';
import { setupRadiusTokens } from './setupRadiusTokens.mjs';
import { setupZindexTokens } from './setupZindexTokens.mjs';
import { setupLetterSpacingTokens } from './setupLetterSpacingTokens.mjs';
import { setupMediaQueryTokens } from './setupMediaQueryTokens.mjs';

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
  if (!sheet || !name) throw new Error(errorProcessTokens);

  const _NAME = name.toLowerCase();
  let processedTokens = undefined;

  if (_NAME === 'color' || _NAME === 'colour' || _NAME === 'colors' || _NAME === 'colours')
    processedTokens = setupColorTokens(sheet);
  if (_NAME === 'space' || _NAME === 'spaces' || _NAME === 'spacing' || _NAME === 'spacings')
    processedTokens = setupSpacingTokens(sheet, settings.spacingUnit);
  if (_NAME === 'fontfamily' || _NAME === 'fontfamilies')
    processedTokens = setupFontTokens(sheet, settings.usePostscriptFontNames);
  if (_NAME === 'fontsize' || _NAME === 'fontsizes')
    processedTokens = setupFontSizeTokens(sheet, settings.fontUnit);
  if (_NAME === 'fontweight' || _NAME === 'fontweights')
    processedTokens = setupFontWeightTokens(sheet);
  if (_NAME === 'lineheight' || _NAME === 'lineheights')
    processedTokens = setupLineHeightTokens(sheet);
  if (_NAME === 'shadow' || _NAME === 'shadows') processedTokens = setupShadowTokens(sheet);
  if (_NAME === 'borderwidth' || _NAME === 'borderwidths')
    processedTokens = setupBorderWidthTokens(sheet);
  if (_NAME === 'radius' || _NAME === 'radii') processedTokens = setupRadiusTokens(sheet);
  if (_NAME === 'zindex' || _NAME === 'zindices') processedTokens = setupZindexTokens(sheet);
  if (_NAME === 'letterspacing' || _NAME === 'letterspacings')
    processedTokens = setupLetterSpacingTokens(sheet);
  if (_NAME === 'mediaquery' || _NAME === 'mediaqueries')
    processedTokens = setupMediaQueryTokens(sheet);

  return processedTokens;
}
