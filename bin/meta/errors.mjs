import { colors } from './colors.mjs';

export const errorDownloadFile = `${colors.FgRed}Missing one or more of "url", "folder", or "file" arguments in downloadFile()!`;

export const errorGetData = `${colors.FgRed}Could not retrieve any data. Are you missing a valid API key?`;

export const errorCamelize = `${colors.FgRed}No string provided to camelize()!`;

export const errorCreateConfiguration = `${colors.FgRed}No path provided to createConfiguration()!`;

export const errorCreateFolder = `${colors.FgRed}No directory specified for createFolder()!`;

export const errorCreatePage = `${colors.FgRed}No pages provided to createPage()!`;

export const errorCreateImportStringFromList = `${colors.FgRed}No "importArray" provided to createImportStringFromList()!`;
export const errorCreateImportStringFromListZeroLength = `${colors.FgRed}Provided "importArray" is zero-length when calling createImportStringFromList()!`;

export const errorConvertHexToRgba = `${colors.FgRed}Missing one or more of red, green, blue and alpha in convertHexToRgba()!`;

export const errorFindShortenedNameMatchString = `${colors.FgRed}No "matchString" was provided to findShortenedNameMatch()!`;
export const errorFindShortenedNameMatchOriginal = `${colors.FgRed}No "originalString" was provided to findShortenedNameMatch()!`;
export const errorFindShortenedNameMatchWrongType = `${colors.FgRed}Arguments are not of string type!`;

export const errorFormatName = `${colors.FgRed}No string for formatName()!`;

export const errorParseCssFromElement = `${colors.FgRed}Missing one or more of required arguments: "element", and/or "remSize" when calling parseCssFromElement()!`;

export const errorParseElement = `${colors.FgRed}Missing one or more of required arguments: "element", and/or "remSize" when calling parseElement()!`;

export const errorProcessElements = `${colors.FgRed}Missing one or more of required arguments: "elementsPage", "config", and/or "components"! Make sure you have a page called "Elements" in your Figma document.`;

export const errorProcessElementsWrongElementCount = `${colors.FgRed}Did not find exactly 1 (one) match for element`;
export const errorProcessElementsWrongTextElementCount = `${colors.FgRed}Found more than one match for "Text" node. Required: 0 or 1 text nodes as child of element`;

export const errorReplaceMediaQuery = `Missing one or more of required arguments: "str", and/or "match" when calling replaceMediaQuery()!`;

export const errorGetFromApi = `${colors.FgRed}Missing one or more of required arguments: "figmaToken", "figmaUrl"!`;

export const errorProcessGraphics = `${colors.FgRed}Graphics page is undefined or empty! Make sure you have a page called "Graphics" in your Figma document.`;
export const errorProcessGraphicsImageError = `${colors.FgRed}Error when fetching graphics from Figma API!`;
export const errorProcessGraphicsNoImages = `${colors.FgRed}No images received from Figma API!`;

export const errorGetIds = `${colors.FgRed}No (or zero-length) array passed to getIds()!`;

export const errorGetTokenMatch = `${colors.FgRed}Missing one or more of required arguments: "tokens", "tokenFileName", "property", and/or "expectedValue"!`;
export const errorGetTokenMatchNoRemSize = `${colors.FgRed}Missing required "remSize" argument for getTokenMatch() when converting to rem/em!`;

export const errorParseTypographyStylingFromElement = `${colors.FgRed}Missing one or more of required arguments: "element", or "remSize" when calling parseTypographyStylingFromElement()!`;

export const errorLoadFile = `${colors.FgRed}Could not find file!`;

export const errorNormalizeUnits = `${colors.FgRed}Missing parameters for normalizeUnits()!`;
export const errorNormalizeUnitsNoRemSize = `${colors.FgRed}Missing required "remSize" argument for normalizeUnits() when converting to rem/em!`;
export const errorNormalizeUnitsUndefined = `${colors.FgRed}Parameters "rootSize" or "unitSize" are undefined!`;

export const errorParseCliArgs = `${colors.FgRed}No arguments array passed to parseCliArgs()!`;

export const errorProcessTokens = `${colors.FgRed}No sheet or name for processTokens()!`;

export const errorProcessNestedCss = `${colors.FgRed}No 'css' string provided to processNestedCss()!`;
export const errorCreateCssString = `${colors.FgRed}Missing one or more of required arguments: "intersections", "uniqueValues"!`;

export const errorRoundColor = `${colors.FgRed}Error while rounding color value: Required argument "quantity" was not passed in!`;
export const errorRoundColorValue = `${colors.FgRed}Error while rounding color value: Scale value must be equal to or less than 255!`;

export const errorSetupColorTokensNoFrame = `${colors.FgRed}No frame for setupColorTokens()!`;
export const errorSetupColorTokensNoChildren = `${colors.FgRed}Color tokens frame has no children!`;
export const errorSetupColorTokensNoFills = `${colors.FgRed}Color has no "fills" property!`;

export const errorSetupFontSizeTokensNoFrame = `${colors.FgRed}No frame for setupFontSizeTokens()!`;
export const errorSetupFontSizeTokensNoChildren = `${colors.FgRed}Font size frame is missing "children" array!`;
export const errorSetupFontSizeTokensNoSizing = `${colors.FgRed}Missing "fontUnit" or "remSize" properties when calling setupFontSizeTokens()!`;
export const errorSetupFontSizeTokensMissingProps = `${colors.FgRed}Missing "name" or "style" properties in font sizes frame!`;
export const errorSetupFontSizeTokensMissingSize = `${colors.FgRed}Missing required "style.fontSize" property!`;

export const errorSetupFontTokensNoFrame = `${colors.FgRed}No frame for setupFontTokens()!`;
export const errorSetupFontTokensNoChildren = `${colors.FgRed}Font tokens frame is missing "children" array!`;
export const errorSetupFontTokensMissingProps = `${colors.FgRed}Missing "name" or "style" properties in font tokens frame!`;

export const errorSetupFontWeightTokensNoFrame = `${colors.FgRed}No frame for setupFontWeightTokens()!`;
export const errorSetupFontWeightTokensNoChildren = `${colors.FgRed}Font weights frame is missing "children" array!`;
export const errorSetupFontWeightTokensMissingProps = `${colors.FgRed}Missing "name" or "style" properties in font weights frame!`;
export const errorSetupFontWeightTokensMissingWeight = `${colors.FgRed}Missing required "style.fontWeight" property!`;

export const errorSetupLineHeightTokensNoFrame = `${colors.FgRed}No frame for setupLineHeightTokens()!`;
export const errorSetupLineHeightTokensNoChildren = `${colors.FgRed}Line heights frame has no children!`;
export const errorSetupLineHeightTokensMissingProps = `${colors.FgRed}Missing "name" or "style" properties in line heights frame!`;
export const errorSetupLineHeightTokensMissingPercent = `${colors.FgRed}Missing "style.lineHeightPercentFontSize" property in line heights frame!`;

export const errorSetupSpacingTokensNoFrame = `${colors.FgRed}No frame for setupSpacingTokens()!`;
export const errorSetupSpacingTokensNoChildren = `${colors.FgRed}Spacing frame has no children!`;
export const errorSetupSpacingTokensNoUnits = `${colors.FgRed}Missing "spacingUnit" or "remSize" properties when calling setupSpacingTokens()!`;
export const errorSetupSpacingTokensMissingProps = `${colors.FgRed}Missing "name" or "absoluteBoundingBox" properties in spacing frame!`;

export const errorSetupShadowTokensNoFrame = `${colors.FgRed}No frame for setupShadowTokens()!`;
export const errorSetupShadowTokensNoChildren = `${colors.FgRed}Shadow frame has no children!`;
export const errorSetupShadowTokensMissingProps = `${colors.FgRed}Missing "effects" property in shadow frame!`;

export const errorSetupZindexTokensNoFrame = `${colors.FgRed}No frame for setupZindexTokens()!`;
export const errorSetupZindexTokensNoChildren = `${colors.FgRed}Z Index frame has no children!`;
export const errorSetupZindexTokensMissingProps = `${colors.FgRed}Missing "name" or "characters" properties in Z index frame!`;

export const errorSetupLetterSpacingTokensNoFrame = `${colors.FgRed}No frame for setupLetterSpacingTokens()!`;
export const errorSetupLetterSpacingTokensNoChildren = `${colors.FgRed}Letter Spacing frame has no children!`;
export const errorSetupLetterSpacingTokensMissingProps = `${colors.FgRed}Missing "name" or "style" properties in letter spacing frame!`;

export const errorSetupMediaQueryTokensNoFrame = `${colors.FgRed}No frame for setupMediaQueryTokens()!`;
export const errorSetupMediaQueryTokensNoChildren = `${colors.FgRed}Media Query frame has no children!`;
export const errorSetupMediaQueryTokensMissingProps = `${colors.FgRed}Missing "absoluteBoundingBox" property in media query frame!`;

export const errorSetupRadiusTokensNoFrame = `${colors.FgRed}No frame for setupRadiusTokens()!`;
export const errorSetupRadiusTokensNoChildren = `${colors.FgRed}Radius frame has no children!`;
export const errorSetupRadiusTokensMissingProps = `${colors.FgRed}Missing "name"  property in radius frame!`;

export const errorSetupBorderWidthTokensNoFrame = `${colors.FgRed}No frame for setupBorderWidthTokens()!`;
export const errorSetupBorderWidthTokensNoChildren = `${colors.FgRed}Border Width has no children!`;
export const errorSetupBorderWidthTokensMissingProps = `${colors.FgRed}Missing "name" or "strokeWeight" properties in border width frame!`;

export const errorWriteFile = `${colors.FgRed}Missing required parameters to correctly run writeFile()!`;
export const errorWriteFileWrongType = `${colors.FgRed}Provided invalid file type to writeFile()!`;

export const errorWrite = `${colors.FgRed}Error while attempting to write file!`;
export const errorWriteTokens = `${colors.FgRed}Less than one token provided to writeTokens()! Make sure you have a page called "Design Tokens" in your Figma document.`;
export const errorWriteTokensNoSettings = `${colors.FgRed}Missing "settings" argument/object when attempting to write tokens!`;

export const errorWriteElements = `${colors.FgRed}Missing "elements" and/or "config" properties when calling writeElements()!`;
