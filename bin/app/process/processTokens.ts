import { FRAME as Frame } from '../contracts/Figma';
import { Config } from '../../entities/Config/Config';
import { setupColorTokens } from '../../entities/Tokens/tokens/setupColorTokens';
import { setupSpacingTokens } from '../../entities/Tokens/tokens/setupSpacingTokens';
import { setupFontTokens } from '../../entities/Tokens/tokens/setupFontTokens';
import { setupFontSizeTokens } from '../../entities/Tokens/tokens/setupFontSizeTokens';
import { setupFontWeightTokens } from '../../entities/Tokens/tokens/setupFontWeightTokens';
import { setupLineHeightTokens } from '../../entities/Tokens/tokens/setupLineHeightTokens';
import { setupShadowTokens } from '../../entities/Tokens/tokens/setupShadowTokens';
import { setupBorderWidthTokens } from '../../entities/Tokens/tokens/setupBorderWidthTokens';
import { setupRadiusTokens } from '../../entities/Tokens/tokens/setupRadiusTokens';
import { setupZindexTokens } from '../../entities/Tokens/tokens/setupZindexTokens';
import { setupLetterSpacingTokens } from '../../entities/Tokens/tokens/setupLetterSpacingTokens';
import { setupMediaQueryTokens } from '../../entities/Tokens/tokens/setupMediaQueryTokens';
import { setupOpacityTokens } from '../../entities/Tokens/tokens/setupOpacityTokens';
import { setupDurationTokens } from '../../entities/Tokens/tokens/setupDurationTokens';
import { setupDelayTokens } from '../../entities/Tokens/tokens/setupDelayTokens';
import { setupEasingTokens } from '../../entities/Tokens/tokens/setupEasingTokens';

import { ignoreElementsKeywords } from '../../frameworks/system/ignoreElementsKeywords';
import { ErrorProcessTokens, ErrorProcessTokensNoConfig } from '../../frameworks/errors/errors';

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
  const children = (() => {
    if (sheet.children && sheet.children.length > 0) {
      return sheet.children.filter((item: Frame) => {
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
    }
  })();

  sheet.children = children;

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
