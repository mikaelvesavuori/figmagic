export const errorGetData = 'Could not retrieve any data. Are you missing a valid API key?';

export const errorCamelize = 'No string provided to camelize()!';

export const errorCreateFolder = 'No directory specified for createFolder()!';

export const errorCreatePage = 'No pages provided to createPage()!';

export const errorFindShortenedNameMatchString =
  'No "matchString" was provided to findShortenedNameMatch()!';
export const errorFindShortenedNameMatchOriginal =
  'No "originalString" was provided to findShortenedNameMatch()!';
export const errorFindShortenedNameMatchWrongType = 'Arguments are not of string type!';

export const errorFormatName = 'No string for formatName()!';

export const errorGetFromApi =
  'Missing one or more of required arguments: "figmaToken", "figmaUrl"!';

export const errorLoadFile = 'Could not find file!';

export const errorNormalizeUnits = 'Missing parameters for normalizeUnits()!';
export const errorNormalizeUnitsUndefined = 'Parameters "rootSize" or "unitSize" are undefined!';

export const errorProcessTokens = 'No sheet or name for processTokens()!';

export const errorRoundColor =
  'Error while rounding color value: Required argument "quantity" was not passed in!';
export const errorRoundColorValue =
  'Error while rounding color value: Scale value must be equal to or less than 255!';

export const errorSetupColorTokensNoFrame = 'No frame for setupColorTokens()!';
export const errorSetupColorTokensNoChildren = 'Color tokens frame has no children!';
export const errorSetupColorTokensNoFills = 'Color has no "fills" property!';

export const errorSetupFontSizeTokensNoFrame = 'No frame for setupFontSizeTokens()!';
export const errorSetupFontSizeTokensNoChildren = 'Font size frame is missing "children" array!';
export const errorSetupFontSizeTokensMissingProps =
  'Missing "name" or "style" properties in font sizes frame!';
export const errorSetupFontSizeTokensMissingSize = 'Missing required "style.fontSize" property!';

export const errorSetupFontTokensNoFrame = 'No frame for setupFontTokens()!';
export const errorSetupFontTokensNoChildren = 'Font tokens frame is missing "children" array!';
export const errorSetupFontTokensMissingProps =
  'Missing "name" or "style" properties in font tokens frame!';

export const errorSetupFontWeightTokensNoFrame = 'No frame for setupFontWeightTokens()!';
export const errorSetupFontWeightTokensNoChildren =
  'Font weights frame is missing "children" array!';
export const errorSetupFontWeightTokensMissingProps =
  'Missing "name" or "style" properties in font weights frame!';
export const errorSetupFontWeightTokensMissingWeight =
  'Missing required "style.fontWeight" property!';

export const errorSetupLineHeightTokensNoFrame = 'No frame for setupLineHeightTokens()!';
export const errorSetupLineHeightTokensNoChildren = 'Line heights frame has no children!';
export const errorSetupLineHeightTokensMissingProps =
  'Missing "name" or "style" properties in line heights frame!';
export const errorSetupLineHeightTokensMissingPercent =
  'Missing "style.lineHeightPercentFontSize" property in line heights frame!';

export const errorSetupSpacingTokensNoFrame = 'No frame for setupSpacingTokens()!';
export const errorSetupSpacingTokensNoChildren = 'Spacing frame has no children!';
export const errorSetupSpacingTokensMissingProps =
  'Missing "name" or "absoluteBoundingBox" properties in spacing frame!';

export const errorWriteFile = 'Missing required parameters to correctly run writeFile()!';

export const errorWrite = 'Error while attempting to write file!';
export const errorWriteTokens = 'Less than one token provided to writeTokens()!';
export const errorWriteTokensNoSettings =
  'Missing "settings" argument/object when attempting to write tokens!';
