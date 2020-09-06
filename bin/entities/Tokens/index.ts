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

export class Token {
  constructor() {
    //
  }

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
}
