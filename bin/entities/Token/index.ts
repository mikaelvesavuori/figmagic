import { FRAME as Frame } from '../../contracts/Figma';
import { Config } from '../../contracts/Config';
import { ProcessedToken } from '../../contracts/ProcessedToken';
import { WriteOperation } from '../../contracts/Write';
import { TokenOperations } from '../../contracts/Tokens';

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
    if (!frame || !tokenName) throw Error(ErrorExtractTokens);

    frame.children = this.getChildren(frame);
    return this.getTokens(frame, tokenName.toLowerCase(), config);
  }

  private getChildren = (frame: Frame): Frame[] => {
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

    return [];
  };

  private getTokens = (frame: Frame, name: string, config: Config): TokenOperations => {
    const {
      borderWidthUnit,
      camelizeTokenNames,
      fontUnit,
      letterSpacingUnit,
      lineHeightUnit,
      opacitiesUnit,
      outputFormatColors,
      radiusUnit,
      remSize,
      shadowUnit,
      durationUnit,
      spacingUnit,
      unitlessPrecision,
      usePostscriptFontNames,
      useLiteralFontFamilies
    } = config;

    const tokenOperations = {
      borderwidths: () =>
        makeBorderWidthTokens(frame, borderWidthUnit, remSize, camelizeTokenNames),
      color: () => makeColorTokens(frame, outputFormatColors, camelizeTokenNames),
      colors: () => makeColorTokens(frame, outputFormatColors, camelizeTokenNames),
      delays: () => makeDelayTokens(frame, camelizeTokenNames),
      durations: () => makeDurationTokens(frame, durationUnit, camelizeTokenNames),
      easings: () => makeEasingTokens(frame, camelizeTokenNames),
      fontfamilies: () => {
        if (!config) throw Error(ErrorExtractTokensNoConfig);
        return makeFontTokens(
          frame,
          usePostscriptFontNames,
          useLiteralFontFamilies,
          camelizeTokenNames
        );
      },
      fontsizes: () => {
        if (!config) throw Error(ErrorExtractTokensNoConfig);
        return makeFontSizeTokens(frame, fontUnit, remSize, camelizeTokenNames);
      },
      fontweights: () => makeFontWeightTokens(frame, camelizeTokenNames),
      letterspacings: () => {
        if (!config) throw Error(ErrorExtractTokensNoConfig);
        return makeLetterSpacingTokens(frame, letterSpacingUnit, camelizeTokenNames);
      },
      lineheights: () =>
        makeLineHeightTokens(frame, remSize, unitlessPrecision, lineHeightUnit, camelizeTokenNames),
      mediaqueries: () => makeMediaQueryTokens(frame, camelizeTokenNames),
      opacities: () => {
        if (!config) throw Error(ErrorExtractTokensNoConfig);
        return makeOpacityTokens(frame, opacitiesUnit, camelizeTokenNames);
      },
      radii: () => makeRadiusTokens(frame, radiusUnit, remSize, camelizeTokenNames),
      shadows: () => makeShadowTokens(frame, shadowUnit, remSize, camelizeTokenNames),
      spacing: () => {
        if (!config) throw Error(ErrorExtractTokensNoConfig);
        return makeSpacingTokens(frame, spacingUnit, remSize, camelizeTokenNames);
      },
      spacings: () => {
        if (!config) throw Error(ErrorExtractTokensNoConfig);
        return makeSpacingTokens(frame, spacingUnit, remSize, camelizeTokenNames);
      },
      zindices: () => makeZindexTokens(frame, camelizeTokenNames)
    };

    // @ts-ignore
    if (tokenOperations.hasOwnProperty(name)) return tokenOperations[name]();

    // @ts-ignore
    return {};
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
