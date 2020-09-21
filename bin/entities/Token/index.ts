import { FRAME as Frame } from '../../contracts/Figma';
import { Config } from '../../contracts/Config';
import { ProcessedToken } from '../../contracts/ProcessedToken';
import { WriteOperation } from '../../contracts/Write';
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

import { setupColorTokens } from './logic/setupColorTokens';
import { setupSpacingTokens } from './logic/setupSpacingTokens';
import { setupFontTokens } from './logic/setupFontTokens';
import { setupFontSizeTokens } from './logic/setupFontSizeTokens';
import { setupFontWeightTokens } from './logic/setupFontWeightTokens';
import { setupLineHeightTokens } from './logic/setupLineHeightTokens';
import { setupShadowTokens } from './logic/setupShadowTokens';
import { setupBorderWidthTokens } from './logic/setupBorderWidthTokens';
import { setupRadiusTokens } from './logic/setupRadiusTokens';
import { setupZindexTokens } from './logic/setupZindexTokens';
import { setupLetterSpacingTokens } from './logic/setupLetterSpacingTokens';
import { setupMediaQueryTokens } from './logic/setupMediaQueryTokens';
import { setupOpacityTokens } from './logic/setupOpacityTokens';
import { setupDurationTokens } from './logic/setupDurationTokens';
import { setupDelayTokens } from './logic/setupDelayTokens';
import { setupEasingTokens } from './logic/setupEasingTokens';

import { ignoreElementsKeywords } from '../../frameworks/system/ignoreElementsKeywords';
import { ErrorExtractTokens, ErrorExtractTokensNoConfig } from '../../frameworks/errors/errors';

export const makeToken = (token: Frame, tokenName: string, config: Config): Token =>
  new Token(token, tokenName, config);

class Token {
  token: Frame;
  tokenName: string;
  config: Config;
  writeOperation: null | WriteOperation;

  constructor(token: Frame, tokenName: string, config: Config) {
    this.token = token;
    this.tokenName = tokenName;
    this.config = config;
    this.writeOperation = null;

    const processedToken = this.extractTokens(this.token, this.tokenName, this.config);
    this.setWriteOperation(processedToken, tokenName);
  }

  private extractTokens(frame: Frame, tokenName: string, config: Config): ProcessedToken {
    try {
      if (!frame || !tokenName) throw new Error(ErrorExtractTokens);

      frame.children = this.getChildren(frame);
      return this.getTokens(frame, tokenName.toLowerCase(), config);
    } catch (error) {
      throw new Error(error);
    }
  }

  private getChildren = (frame: Frame): any => {
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

  private getTokens = (frame: Frame, name: string, config: Config): any => {
    switch (name) {
      case 'borderwidths':
        return setupBorderWidthTokens(frame);
      case 'color':
      case 'colors': {
        return setupColorTokens(frame);
      }
      case 'fontfamilies': {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
        return setupFontTokens(frame, config.usePostscriptFontNames);
      }
      case 'fontsizes': {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
        return setupFontSizeTokens(frame, config.fontUnit, config.remSize);
      }
      case 'fontweights':
        return setupFontWeightTokens(frame);
      case 'letterspacings': {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
        return setupLetterSpacingTokens(frame, config.letterSpacingUnit);
      }
      case 'lineheights':
        return setupLineHeightTokens(frame, config.remSize);
      case 'mediaqueries':
        return setupMediaQueryTokens(frame);
      case 'opacities': {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
        return setupOpacityTokens(frame, config.opacitiesUnit);
      }
      case 'radii':
        return setupRadiusTokens(frame, config.remSize);
      case 'shadows':
        return setupShadowTokens(frame);
      case 'spacing':
      case 'spacings': {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
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

  setWriteOperation = (processedToken: ProcessedToken, tokenName: string): void => {
    this.writeOperation = {
      type: 'token',
      file: processedToken,
      path: this.config.outputFolderTokens,
      name: tokenName,
      format: this.config.outputTokenFormat
    };
  };

  getWriteOperation = (): WriteOperation | null => {
    if (this.writeOperation) return this.writeOperation;
    return null;
  };
}

export const makeBorderWidthTokens = (obj: Record<any, any>): BorderWidthTokens =>
  obj as BorderWidthTokens;
export const makeColorTokens = (obj: Record<any, any>): ColorTokens => obj as ColorTokens;
export const makeDelayTokens = (obj: Record<any, any>): DelayTokens => obj as DelayTokens;
export const makeDurationTokens = (obj: Record<any, any>): DurationTokens => obj as DurationTokens;
export const makeEasingTokens = (obj: Record<any, any>): EasingTokens => obj as EasingTokens;
export const makeFontSizeTokens = (obj: Record<any, any>): FontSizeTokens => obj as FontSizeTokens;
export const makeFontTokens = (obj: Record<any, any>): FontTokens => obj as FontTokens;
export const makeFontWeightTokens = (obj: Record<any, any>): FontWeightTokens =>
  obj as FontWeightTokens;
export const makeLetterSpacingTokens = (obj: Record<any, any>): LetterSpacingTokens =>
  obj as LetterSpacingTokens;
export const makeLineHeightTokens = (obj: Record<any, any>): LineHeightTokens =>
  obj as LineHeightTokens;
export const makeMediaQueryTokens = (obj: Record<any, any>): MediaQueryTokens =>
  obj as MediaQueryTokens;
export const makeOpacityTokens = (obj: Record<any, any>): OpacityTokens => obj as OpacityTokens;
export const makeRadiusTokens = (obj: Record<any, any>): RadiusTokens => obj as RadiusTokens;
export const makeShadowTokens = (obj: Record<any, any>): ShadowTokens => obj as ShadowTokens;
export const makeSpacingTokens = (obj: Record<any, any>): SpacingTokens => obj as SpacingTokens;
export const makeZindexTokens = (obj: Record<any, any>): ZindexTokens => obj as ZindexTokens;
