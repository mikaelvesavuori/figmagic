import { FRAME as Frame } from '../../contracts/Figma';
import { Config } from '../../contracts/Config';
import { ProcessedToken } from '../../contracts/ProcessedToken';
import { WriteOperation } from '../../contracts/Write';

import { makeColorTokens } from './logic/makeColorTokens';
import { makeSpacingTokens } from './logic/makeSpacingTokens';
import { makeFontTokens } from './logic/makeFontTokens';
import { makeFontSizeTokens } from './logic/makeFontSizeTokens';
import { makeFontWeightTokens } from './logic/makeFontWeightTokens';
import { makeLineHeightTokens } from './logic/makeLineHeightTokens';
import { makeShadowTokens } from './logic/makeShadowTokens';
import { makeBorderWidthTokens } from './logic/makeBorderWidthTokens';
import { makeRadiusTokens } from './logic/makeRadiusTokens';
import { makeZindexTokens } from './logic/makeZindexTokens';
import { makeLetterSpacingTokens } from './logic/makeLetterSpacingTokens';
import { makeMediaQueryTokens } from './logic/makeMediaQueryTokens';
import { makeOpacityTokens } from './logic/makeOpacityTokens';
import { makeDurationTokens } from './logic/makeDurationTokens';
import { makeDelayTokens } from './logic/makeDelayTokens';
import { makeEasingTokens } from './logic/makeEasingTokens';

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
        return makeBorderWidthTokens(frame);
      case 'color':
      case 'colors': {
        return makeColorTokens(frame);
      }
      case 'fontfamilies': {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
        return makeFontTokens(frame, config.usePostscriptFontNames);
      }
      case 'fontsizes': {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
        return makeFontSizeTokens(frame, config.fontUnit, config.remSize);
      }
      case 'fontweights':
        return makeFontWeightTokens(frame);
      case 'letterspacings': {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
        return makeLetterSpacingTokens(frame, config.letterSpacingUnit);
      }
      case 'lineheights':
        return makeLineHeightTokens(frame, config.remSize);
      case 'mediaqueries':
        return makeMediaQueryTokens(frame);
      case 'opacities': {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
        return makeOpacityTokens(frame, config.opacitiesUnit);
      }
      case 'radii':
        return makeRadiusTokens(frame, config.remSize);
      case 'shadows':
        return makeShadowTokens(frame);
      case 'spacing':
      case 'spacings': {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
        return makeSpacingTokens(frame, config.spacingUnit, config.remSize);
      }
      case 'zindices':
        return makeZindexTokens(frame);
      case 'durations':
        return makeDurationTokens(frame);
      case 'delays':
        return makeDelayTokens(frame);
      case 'easings':
        return makeEasingTokens(frame);
    }
  };

  setWriteOperation = (processedToken: ProcessedToken, tokenName: string): void => {
    this.writeOperation = {
      type: 'token',
      file: processedToken,
      path: this.config.outputFolderTokens,
      name: tokenName,
      format: this.config.outputFormatTokens
    };
  };

  getWriteOperation = (): WriteOperation | null => {
    if (this.writeOperation) return this.writeOperation;
    return null;
  };
}
