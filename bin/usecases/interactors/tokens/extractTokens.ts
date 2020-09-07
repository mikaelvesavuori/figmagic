import { FRAME as Frame } from '../../../contracts/Figma';
import { Config } from '../../../contracts/Config';
import { ProcessedToken } from '../../../contracts/ProcessedToken';

import { setupColorTokens } from '../../../entities/Tokens/tokens/setupColorTokens';
import { setupSpacingTokens } from '../../../entities/Tokens/tokens/setupSpacingTokens';
import { setupFontTokens } from '../../../entities/Tokens/tokens/setupFontTokens';
import { setupFontSizeTokens } from '../../../entities/Tokens/tokens/setupFontSizeTokens';
import { setupFontWeightTokens } from '../../../entities/Tokens/tokens/setupFontWeightTokens';
import { setupLineHeightTokens } from '../../../entities/Tokens/tokens/setupLineHeightTokens';
import { setupShadowTokens } from '../../../entities/Tokens/tokens/setupShadowTokens';
import { setupBorderWidthTokens } from '../../../entities/Tokens/tokens/setupBorderWidthTokens';
import { setupRadiusTokens } from '../../../entities/Tokens/tokens/setupRadiusTokens';
import { setupZindexTokens } from '../../../entities/Tokens/tokens/setupZindexTokens';
import { setupLetterSpacingTokens } from '../../../entities/Tokens/tokens/setupLetterSpacingTokens';
import { setupMediaQueryTokens } from '../../../entities/Tokens/tokens/setupMediaQueryTokens';
import { setupOpacityTokens } from '../../../entities/Tokens/tokens/setupOpacityTokens';
import { setupDurationTokens } from '../../../entities/Tokens/tokens/setupDurationTokens';
import { setupDelayTokens } from '../../../entities/Tokens/tokens/setupDelayTokens';
import { setupEasingTokens } from '../../../entities/Tokens/tokens/setupEasingTokens';

import { ignoreElementsKeywords } from '../../../frameworks/system/ignoreElementsKeywords';
import { ErrorProcessTokens, ErrorProcessTokensNoConfig } from '../../../frameworks/errors/errors';

/**
 * @description Extract tokens from frame
 *
 * @param frame Frame object from Figma
 * @param name Token name
 * @param config User configuration object
 */
export function extractTokens(frame: Frame, name: string, config: Config): ProcessedToken {
  try {
    if (!frame || !name) throw new Error(ErrorProcessTokens);

    frame.children = getChildren(frame);
    return getTokens(frame, name.toLowerCase(), config);
  } catch (error) {
    throw new Error(error);
  }
}

const getChildren = (frame: Frame): any => {
  if (frame.children && frame.children.length > 0) {
    return frame.children.filter((item: Frame) => {
      let shouldInclude = true;

      // Filter out elements that contain ignore keywords in their name
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
};

const getTokens = (frame: Frame, name: string, config: Config): any => {
  switch (name) {
    case 'borderwidths':
      return setupBorderWidthTokens(frame);
    case 'color':
    case 'colors': {
      return setupColorTokens(frame);
    }
    case 'fontfamilies': {
      if (!config) throw new Error(ErrorProcessTokensNoConfig);
      return setupFontTokens(frame, config.usePostscriptFontNames);
    }
    case 'fontsizes': {
      if (!config) throw new Error(ErrorProcessTokensNoConfig);
      return setupFontSizeTokens(frame, config.fontUnit, config.remSize);
    }
    case 'fontweights':
      return setupFontWeightTokens(frame);
    case 'letterspacings': {
      if (!config) throw new Error(ErrorProcessTokensNoConfig);
      return setupLetterSpacingTokens(frame, config.letterSpacingUnit);
    }
    case 'lineheights':
      return setupLineHeightTokens(frame, config.remSize);
    case 'mediaqueries':
      return setupMediaQueryTokens(frame);
    case 'opacities': {
      if (!config) throw new Error(ErrorProcessTokensNoConfig);
      return setupOpacityTokens(frame, config.opacitiesUnit);
    }
    case 'radii':
      return setupRadiusTokens(frame, config.remSize);
    case 'shadows':
      return setupShadowTokens(frame);
    case 'spacing':
    case 'spacings': {
      if (!config) throw new Error(ErrorProcessTokensNoConfig);
      return setupSpacingTokens(frame, config.spacingUnit, config.remSize);
    }
    case 'zindices':
      return setupZindexTokens(frame);
    case 'durations':
      return setupDurationTokens(frame);
    case 'delays':
      return setupDelayTokens(frame);
    case 'easings':
      return setupEasingTokens(frame);
  }
};
