import { FRAME as Frame } from '../../contracts/Figma';
import { Config } from '../../contracts/Config';
import { ProcessedToken } from '../../contracts/ProcessedToken';

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

import {
  BorderWidthTokens,
  ColorTokens,
  DelayTokens,
  DurationTokens,
  EasingTokens,
  FontSizeTokens,
  FontTokens,
  FontWeightTokens,
  LetterSpacingTokens,
  LineHeightTokens,
  MediaQueryTokens,
  OpacityTokens,
  RadiusTokens,
  ShadowTokens,
  SpacingTokens,
  ZindexTokens
} from '../../contracts/Tokens';

export const makeToken = (token: Token, tokenName: string, config: Config): Token =>
  new Token(token, tokenName, config);

export class Token {
  token: Token;
  tokenName: string;
  config: Config;

  constructor(token: Token, tokenName: string, config: Config) {
    this.token = token;
    this.tokenName = tokenName;
    this.config = config;

    this.processTokens(this.token, this.tokenName, this.config);
  }

  /**
   * @description Process tokens
   *
   * @param frame Sheet/frame object from Figma
   * @param name Token name
   * @param config User configuration object
   */
  processTokens(sheet: Frame, name: string, config: Config): ProcessedToken {
    try {
      if (!sheet || !name) throw new Error(ErrorProcessTokens);

      sheet.children = this.getChildren(sheet);
      return this.getTokens(sheet, name.toLowerCase(), config);
    } catch (error) {
      throw new Error(error);
    }
  }

  getChildren = (sheet: Frame): any => {
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

  getTokens = (sheet: Frame, name: string, config: Config): any => {
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

  /*
  makeBorderWidthTokens = (obj: object): BorderWidthTokens => obj as BorderWidthTokens;
  makeColorTokens = (obj: object): ColorTokens => obj as ColorTokens;
  makeDelayTokens = (obj: object): DelayTokens => obj as DelayTokens;
  makeDurationTokens = (obj: object): DurationTokens => obj as DurationTokens;
  makeEasingTokens = (obj: object): EasingTokens => obj as EasingTokens;
  makeFontSizeTokens = (obj: object): FontSizeTokens => obj as FontSizeTokens;
  makeFontTokens = (obj: object): FontTokens => obj as FontTokens;
  makeFontWeightTokens = (obj: object): FontWeightTokens => obj as FontWeightTokens;
  makeLetterSpacingTokens = (obj: object): LetterSpacingTokens => obj as LetterSpacingTokens;
  makeLineHeightTokens = (obj: object): LineHeightTokens => obj as LineHeightTokens;
  makeMediaQueryTokens = (obj: object): MediaQueryTokens => obj as MediaQueryTokens;
  makeOpacityTokens = (obj: object): OpacityTokens => obj as OpacityTokens;
  makeRadiusTokens = (obj: object): RadiusTokens => obj as RadiusTokens;
  makeShadowTokens = (obj: object): ShadowTokens => obj as ShadowTokens;
  makeSpacingTokens = (obj: object): SpacingTokens => obj as SpacingTokens;
  makeZindexTokens = (obj: object): ZindexTokens => obj as ZindexTokens;
  */
}

export const makeBorderWidthTokens = (obj: object): BorderWidthTokens => obj as BorderWidthTokens;
export const makeColorTokens = (obj: object): ColorTokens => obj as ColorTokens;
export const makeDelayTokens = (obj: object): DelayTokens => obj as DelayTokens;
export const makeDurationTokens = (obj: object): DurationTokens => obj as DurationTokens;
export const makeEasingTokens = (obj: object): EasingTokens => obj as EasingTokens;
export const makeFontSizeTokens = (obj: object): FontSizeTokens => obj as FontSizeTokens;
export const makeFontTokens = (obj: object): FontTokens => obj as FontTokens;
export const makeFontWeightTokens = (obj: object): FontWeightTokens => obj as FontWeightTokens;
export const makeLetterSpacingTokens = (obj: object): LetterSpacingTokens =>
  obj as LetterSpacingTokens;
export const makeLineHeightTokens = (obj: object): LineHeightTokens => obj as LineHeightTokens;
export const makeMediaQueryTokens = (obj: object): MediaQueryTokens => obj as MediaQueryTokens;
export const makeOpacityTokens = (obj: object): OpacityTokens => obj as OpacityTokens;
export const makeRadiusTokens = (obj: object): RadiusTokens => obj as RadiusTokens;
export const makeShadowTokens = (obj: object): ShadowTokens => obj as ShadowTokens;
export const makeSpacingTokens = (obj: object): SpacingTokens => obj as SpacingTokens;
export const makeZindexTokens = (obj: object): ZindexTokens => obj as ZindexTokens;
