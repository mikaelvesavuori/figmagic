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
import { setupOpacitiesTokens } from '../tokens/setupOpacitiesTokens.mjs';
import { setupDurationTokens } from '../tokens/setupDurationTokens.mjs';
import { setupDelayTokens } from '../tokens/setupDelayTokens.mjs';

import { errorProcessTokens, errorProcessTokensNoConfig } from '../../meta/errors.mjs';
import { ignoreElementsKeywords } from '../../meta/ignoreElementsKeywords.mjs';

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

  // Filter out elements that contain ignore keywords in their name
  sheet.children = sheet.children.filter((item) => {
    let shouldInclude = true;

    for (let i = 0; i < ignoreElementsKeywords.length; i++) {
      const keywordToIgnore = ignoreElementsKeywords[i];

      if (item.name.toLowerCase().indexOf(keywordToIgnore) >= 0) {
        shouldInclude = false;
        break;
      }
    }

    return shouldInclude;
  });

  const _NAME = name.toLowerCase();
  let processedTokens = undefined;

  switch (_NAME) {
    case 'borderwidth':
    case 'borderwidths': {
      processedTokens = setupBorderWidthTokens(sheet);
      break;
    }
    case 'color':
    case 'colors':
    case 'colour':
    case 'colours': {
      processedTokens = setupColorTokens(sheet);
      break;
    }
    case 'fontfamily':
    case 'fontfamilies': {
      if (!config) throw new Error(errorProcessTokensNoConfig);
      processedTokens = setupFontTokens(sheet, config.usePostscriptFontNames);
      break;
    }
    case 'fontsize':
    case 'fontsizes': {
      if (!config) throw new Error(errorProcessTokensNoConfig);
      processedTokens = setupFontSizeTokens(sheet, config.fontUnit, config.remSize);
      break;
    }
    case 'fontweight':
    case 'fontweights': {
      processedTokens = setupFontWeightTokens(sheet);
      break;
    }
    case 'letterspacing':
    case 'letterspacings': {
      if (!config) throw new Error(errorProcessTokensNoConfig);
      processedTokens = setupLetterSpacingTokens(sheet, config.letterSpacingUnit);
      break;
    }
    case 'lineheight':
    case 'lineheights': {
      processedTokens = setupLineHeightTokens(sheet);
      break;
    }
    case 'mediaquery':
    case 'mediaqueries': {
      processedTokens = setupMediaQueryTokens(sheet);
      break;
    }
    case 'opacity':
    case 'opacities': {
      if (!config) throw new Error(errorProcessTokensNoConfig);
      processedTokens = setupOpacitiesTokens(sheet, config.opacitiesUnit);
      break;
    }
    case 'radius':
    case 'radii': {
      processedTokens = setupRadiusTokens(sheet);
      break;
    }
    case 'shadow':
    case 'shadows': {
      processedTokens = setupShadowTokens(sheet);
      break;
    }
    case 'space':
    case 'spaces':
    case 'spacing':
    case 'spacings': {
      if (!config) throw new Error(errorProcessTokensNoConfig);
      processedTokens = setupSpacingTokens(sheet, config.spacingUnit, config.remSize);
      break;
    }
    case 'zindex':
    case 'zindices': {
      processedTokens = setupZindexTokens(sheet);
      break;
    }
    case 'duration':
    case 'durations':
    case 'animation duration':
    case 'animation durations':
    case 'motion duration':
    case 'motion durations': {
      processedTokens = setupDurationTokens(sheet);
      break;
    }
    case 'delay':
    case 'delays':
    case 'animation delay':
    case 'animation delays':
    case 'motion delay':
    case 'motion delays': {
      processedTokens = setupDelayTokens(sheet);
      break;
    }
  }

  return processedTokens;
}
