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

  sheet.children = getChildren(sheet);
  return getTokens(sheet, name.toLowerCase(), config);
}

const getChildren = (sheet: Frame) => {
  if (sheet.children && sheet.children.length > 0) {
    return sheet.children.filter((item: Frame) => {
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

const getTokens = (sheet: Frame, name: string, config: Config) => {
  console.log('getTokens name', name);
  switch (name) {
    case 'borderwidths':
      return setupBorderWidthTokens(sheet);
    case 'color':
    case 'colors': {
      return setupColorTokens(sheet);
    }
    case 'fontfamilies': {
      if (!config) throw new Error(ErrorProcessTokensNoConfig);
      return setupFontTokens(sheet, config.usePostscriptFontNames);
    }
    case 'fontsizes': {
      if (!config) throw new Error(ErrorProcessTokensNoConfig);
      return setupFontSizeTokens(sheet, config.fontUnit, config.remSize);
    }
    case 'fontweights':
      return setupFontWeightTokens(sheet);
    case 'letterspacings': {
      if (!config) throw new Error(ErrorProcessTokensNoConfig);
      return setupLetterSpacingTokens(sheet, config.letterSpacingUnit);
    }
    case 'lineheights':
      return setupLineHeightTokens(sheet, config.remSize);
    case 'mediaqueries':
      return setupMediaQueryTokens(sheet);
    case 'opacities': {
      if (!config) throw new Error(ErrorProcessTokensNoConfig);
      return setupOpacityTokens(sheet, config.opacitiesUnit);
    }
    case 'radii':
      return setupRadiusTokens(sheet, config.remSize);
    case 'shadows':
      return setupShadowTokens(sheet);
    case 'spacing':
    case 'spacings': {
      if (!config) throw new Error(ErrorProcessTokensNoConfig);
      return setupSpacingTokens(sheet, config.spacingUnit, config.remSize);
    }
    case 'zindices':
      return setupZindexTokens(sheet);
    case 'durations':
      return setupDurationTokens(sheet);
    case 'delays':
      return setupDelayTokens(sheet);
    case 'easings':
      return setupEasingTokens(sheet);
  }
};
