import { setupColorTokens } from '../tokens/setupColorTokens.mjs';
import { setupSpacingTokens } from '../tokens/setupSpacingTokens.mjs';
import { setupFontTokens } from '../tokens/setupFontTokens.mjs';
import { setupFontSizeTokens } from '../tokens/setupFontSizeTokens.mjs';
import { setupFontWeightTokens } from '../tokens/setupFontWeightTokens.mjs';
import { setupLineHeightTokens } from '../tokens/setupLineHeightTokens.mjs';
import { setupShadowTokens } from '../tokens/setupShadowTokens.mjs';
import { setupBorderWidthTokens } from '../tokens/setupBorderWidthTokens.mjs';
import { setupRadiusTokens } from '../tokens/setupRadiusTokens.mjs';
import { setupZindexTokens } from '../tokens/setupZindexTokens.mjs';
import { setupLetterSpacingTokens } from '../tokens/setupLetterSpacingTokens.mjs';
import { setupMediaQueryTokens } from '../tokens/setupMediaQueryTokens.mjs';

import { errorProcessTokens, errorProcessTokensNoConfig } from '../../meta/errors.mjs';

/**
 * Process tokens
 *
 * @exports
 * @function
 * @param {object} sheet - Sheet object from Figma
 * @param {string} name - Token name
 * @param {object} [config] - User configuration object
 * @returns {object} - returns object with design tokens
 * @throws {errorProcessTokens} - When missing sheet or name
 * @throws {errorProcessTokensNoConfig} - When missing config, required for certain processing
 */
export function processTokens(sheet, name, config) {
  if (!sheet || !name) throw new Error(errorProcessTokens);

  const _NAME = name.toLowerCase();
  let processedTokens = undefined;

  if (_NAME === 'color' || _NAME === 'colour' || _NAME === 'colors' || _NAME === 'colours')
    processedTokens = setupColorTokens(sheet);
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

  if (_NAME === 'space' || _NAME === 'spaces' || _NAME === 'spacing' || _NAME === 'spacings') {
    if (!config) throw new Error(errorProcessTokensNoConfig);
    processedTokens = setupSpacingTokens(sheet, config.spacingUnit, config.remSize);
  }
  if (_NAME === 'fontfamily' || _NAME === 'fontfamilies') {
    if (!config) throw new Error(errorProcessTokensNoConfig);
    processedTokens = setupFontTokens(sheet, config.usePostscriptFontNames);
  }
  if (_NAME === 'fontsize' || _NAME === 'fontsizes') {
    if (!config) throw new Error(errorProcessTokensNoConfig);
    processedTokens = setupFontSizeTokens(sheet, config.fontUnit, config.remSize);
  }

  return processedTokens;
}
