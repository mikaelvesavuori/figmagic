import { Frame } from '../../entities/Frame/Frame';
import { Config } from '../../entities/Config/Config';

import { setupColorTokens } from '../../entities/Tokens/setupColorTokens';
import { setupSpacingTokens } from '../../entities/Tokens/setupSpacingTokens';
import { setupFontTokens } from '../../entities/Tokens/setupFontTokens';
import { setupFontSizeTokens } from '../../entities/Tokens/setupFontSizeTokens';
import { setupFontWeightTokens } from '../../entities/Tokens/setupFontWeightTokens';
import { setupLineHeightTokens } from '../../entities/Tokens/setupLineHeightTokens';
import { setupShadowTokens } from '../../entities/Tokens/setupShadowTokens';
import { setupBorderWidthTokens } from '../../entities/Tokens/setupBorderWidthTokens';
import { setupRadiusTokens } from '../../entities/Tokens/setupRadiusTokens';
import { setupZindexTokens } from '../../entities/Tokens/setupZindexTokens';
import { setupLetterSpacingTokens } from '../../entities/Tokens/setupLetterSpacingTokens';
import { setupMediaQueryTokens } from '../../entities/Tokens/setupMediaQueryTokens';
import { setupOpacityTokens } from '../../entities/Tokens/setupOpacityTokens';
import { setupDurationTokens } from '../../entities/Tokens/setupDurationTokens';
import { setupDelayTokens } from '../../entities/Tokens/setupDelayTokens';
import { setupEasingTokens } from '../../entities/Tokens/setupEasingTokens';

import { ignoreElementsKeywords } from '../../app/system/ignoreElementsKeywords';
import { ErrorProcessTokens, ErrorProcessTokensNoConfig } from '../../../app/errors/errors';

/**
 * @description Process tokens
 *
 * @param frame Sheet/frame object from Figma
 * @param name Token name
 * @param config User configuration object
 */
// TODO: Return Tokens
export function processTokens(sheet: Frame, name: string, config: Config): any {
  if (!sheet || !name) throw new Error(ErrorProcessTokens);

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
      if (!config) throw new Error(ErrorProcessTokensNoConfig);
      processedTokens = setupFontTokens(sheet, config.usePostscriptFontNames);
      break;
    }
    case 'fontsize':
    case 'fontsizes': {
      if (!config) throw new Error(ErrorProcessTokensNoConfig);
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
      if (!config) throw new Error(ErrorProcessTokensNoConfig);
      processedTokens = setupLetterSpacingTokens(sheet, config.letterSpacingUnit);
      break;
    }
    case 'lineheight':
    case 'lineheights': {
      processedTokens = setupLineHeightTokens(sheet, config.remSize);
      break;
    }
    case 'mediaquery':
    case 'mediaqueries': {
      processedTokens = setupMediaQueryTokens(sheet);
      break;
    }
    case 'opacity':
    case 'opacities': {
      if (!config) throw new Error(ErrorProcessTokensNoConfig);
      processedTokens = setupOpacityTokens(sheet, config.opacitiesUnit);
      break;
    }
    case 'radius':
    case 'radii': {
      processedTokens = setupRadiusTokens(sheet, config.remSize);
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
      if (!config) throw new Error(ErrorProcessTokensNoConfig);
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
    case 'easing':
    case 'animation easing':
    case 'motion easing': {
      processedTokens = setupEasingTokens(sheet);
      break;
    }
  }

  return processedTokens;
}
