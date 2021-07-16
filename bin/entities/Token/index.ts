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

          if (item.name.toLowerCase().indexOf(keywordToIgnore) >= 0 || item.name[0] === '_') {
            shouldInclude = false;
            break;
          }
        }

        return shouldInclude;
      });
    }
  };

  private getTokens = (frame: Frame, name: string, config: Config): any => {
    const tokenOperations = {
      borderwidths: () => makeBorderWidthTokens(frame),
      color: () => makeColorTokens(frame),
      colors: () => makeColorTokens(frame),
      delays: () => makeDelayTokens(frame),
      durations: () => makeDurationTokens(frame),
      easings: () => makeEasingTokens(frame),
      fontfamilies: () => {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
        return makeFontTokens(frame, config.usePostscriptFontNames);
      },
      fontsizes: () => {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
        return makeFontSizeTokens(frame, config.fontUnit, config.remSize);
      },
      fontweights: () => makeFontWeightTokens(frame),
      letterspacings: () => {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
        return makeLetterSpacingTokens(frame, config.letterSpacingUnit);
      },
      lineheights: () =>
        makeLineHeightTokens(
          frame,
          config.remSize,
          config.unitlessPrecision,
          config.lineHeightUnit
        ),
      mediaqueries: () => makeMediaQueryTokens(frame),
      opacities: () => {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
        return makeOpacityTokens(frame, config.opacitiesUnit);
      },
      radii: () => makeRadiusTokens(frame, config.remSize),
      shadows: () => makeShadowTokens(frame),
      spacing: () => {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
        return makeSpacingTokens(frame, config.spacingUnit, config.remSize);
      },
      spacings: () => {
        if (!config) throw new Error(ErrorExtractTokensNoConfig);
        return makeSpacingTokens(frame, config.spacingUnit, config.remSize);
      },
      zindices: () => makeZindexTokens(frame)
    };

    // @ts-ignore
    if (tokenOperations.hasOwnProperty(name)) return tokenOperations[name]();
  };

  setWriteOperation = (processedToken: ProcessedToken, tokenName: string): void => {
    this.writeOperation = {
      type: 'token',
      file: processedToken,
      path: this.config.outputFolderTokens,
      name: tokenName,
      format: this.config.outputFormatTokens,
      overwrite: this.config.overwrite
    };
  };

  getWriteOperation = (): WriteOperation | null => {
    if (this.writeOperation) return this.writeOperation;
    return null;
  };
}
