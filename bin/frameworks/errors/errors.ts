import { colors } from '../system/colors';

function ErrorMessage(str: string): string {
  return `${colors.FgRed}${str}${colors.Reset}`;
}

export const ErrorAddDescriptionToElements = ErrorMessage(
  'Missing elements and/or components in addDescriptionToElements()!'
);
export const ErrorCalculateDegree2Point = ErrorMessage(
  'Missing point1 and/or point2 in calculateDegree2Point!'
);
export const ErrorCheckIfStringOnlyContainsReturnsOrSpaces = ErrorMessage(
  'No string provided to checkIfStringOnlyContainsReturnsOrSpaces()!'
);
export const ErrorCleanArrays = ErrorMessage(
  'Missing one or more of "classNames" and/or "classContent" when calling cleanArrays()!'
);
export const ErrorCleanSvgData = ErrorMessage('No data passed to cleanSvgData()!');
export const ErrorConvertHexToRgba = ErrorMessage(
  'Missing six-digit hex color string (such as "#33ff00") in convertHexToRgba()!'
);
export const ErrorConvertRgbaToHex = ErrorMessage(
  'Missing color value (as string, like "rgba(123,123,123,0.05) when calling convertRgbaToHex()!'
);
export const ErrorCreateConfigurationNoDefault = ErrorMessage(
  'No default configuration provided to createConfiguration()!'
);
export const ErrorCreateCssString = ErrorMessage(
  'Missing one or more of required arguments: "intersections", "uniqueValues"!'
);
export const ErrorCreateElements = ErrorMessage('Missing arguments provided to createElements()!');
export const ErrorCreateEnumStringOutOfObject = ErrorMessage(
  'No object provided to createEnumStringOutOfObject()!'
);
export const ErrorCreateFolder = ErrorMessage('No directory specified for createFolder()!');
export const ErrorCreateMissingFoldersFromPath = ErrorMessage(
  'No directory specified for createMissingFoldersFromPath()!'
);
export const ErrorCreateGraphics = ErrorMessage('Missing arguments provided to createGraphics()!');
export const ErrorCreateImportStringFromList = ErrorMessage(
  'No "importArray" provided to createImportStringFromList()!'
);
export const ErrorCreateImportStringFromListZeroLength = ErrorMessage(
  'Provided "importArray" is zero-length when calling createImportStringFromList()!'
);
export const ErrorCreateLinearGradientString = ErrorMessage(
  'Missing fills and gradientHandlePositions in createLinearGradientString!'
);
export const ErrorCreateRadialGradientString = ErrorMessage(
  'Missing fills and gradientHandlePositions in createRadialGradientString!'
);
export const ErrorCreatePage = ErrorMessage('No pages provided to createPage()!');
export const ErrorCreateSolidColorString = ErrorMessage('Missing fills in createSolidColorString!');
export const ErrorCreateTokens = ErrorMessage(
  'Missing required arguments when calling createTokens()!'
);
export const ErrorDownloadFile = ErrorMessage(
  'Missing one or more of "url", "folder", or "file" arguments in downloadFile()!'
);
export const ErrorExtractDescription = ErrorMessage('Missing description in extractDescription()!');
export const ErrorExtractTokens = ErrorMessage('No sheet or name for processTokens()!');
export const ErrorExtractTokensNoConfig = ErrorMessage('No config provided to processTokens()!');
export const ErrorFigmagicController = ErrorMessage('Error in FigmagicController()!');
export const ErrorFindShortenedNameMatchWrongType = ErrorMessage(
  'Arguments are not of string type!'
);
export const ErrorGetAlphaInPercent = ErrorMessage(
  'Missing RGB(A) color string when calling getAlphaInPercent()!'
);
export const ErrorGetData = ErrorMessage(
  'Could not retrieve any data. Are you missing a valid API key?'
);
export const ErrorGetDataFailedLocalAndRemote = ErrorMessage(
  'Failed to get local and/or remote data in getData()!'
);
export const ErrorGetDataLocal = ErrorMessage('Missing arguments when calling getDataLocal()!');
export const ErrorGetDataNoData = ErrorMessage(
  'No data retrieved. Verify that your Figma document ID ("Figma URL") is correct.'
);
export const ErrorGetDataNoTokenOrUrl = ErrorMessage(
  'Missing token and/or URL when attempting to get remote data!'
);
export const ErrorGetDescription = ErrorMessage('Missing element in getDescription()!');
export const ErrorGetFigmaDocumentId = ErrorMessage(
  'Missing URL when calling getFigmaDocumentId()!'
);
export const ErrorGetFileContentAndPath = ErrorMessage(
  'Missing argument in getFileContentAndPath()!'
);
export const ErrorGetFileContentAndPathMissingFields = ErrorMessage(
  'Missing fields in getFileContentAndPath()!'
);
export const ErrorGetFileContentAndPathNoReturn = ErrorMessage(
  'Missing return in getFileContentAndPath()!'
);
export const ErrorGetFileContents = ErrorMessage('Missing path, name and/or format!');
export const ErrorGetFileList = ErrorMessage(
  'Missing one or more of required arguments: "imageResponse", "ids" and/or "outputFormatGraphics" when calling getFileList()!'
);
export const ErrorGetFiles = ErrorMessage('Error in getFiles()!');
export const ErrorGetFontColor = ErrorMessage('Error in getFontColor()!');
export const ErrorGetFromApi = (errorMessage: string) =>
  ErrorMessage(`Error occurred while using the Figma API: "${errorMessage}"`);
export const ErrorGetFromApiMissingValues = ErrorMessage(
  'Missing one or more of required arguments: "figmaToken", "figmaUrl" when attempting to get data from Figma API!'
);
export const ErrorGetIds = ErrorMessage('No (or zero-length) array passed to getIds()!');
export const ErrorGetIdstring = ErrorMessage(
  'Missing required argument "ids" when calling getIdString()!'
);
export const ErrorGetIntersectingValues = ErrorMessage(
  'Missing "arrays" argument when calling getIntersectingValues()!'
);
export const ErrorGetPaddingX = ErrorMessage('Error when calling getPaddingX()!');
export const ErrorGetPaddingY = ErrorMessage('Error when calling getPaddingY()!');
export const ErrorGetTokenMatch = ErrorMessage(
  'Missing one or more of required arguments: "tokenFileName", "property", and/or "expectedValue"!'
);
export const ErrorGetSvgFileData = ErrorMessage('Missing string when calling getSvgFileData()!');
export const ErrorGetTokenMatchNoRemSize = ErrorMessage(
  'Missing required "remSize" argument for getTokenMatch() when converting to rem/em!'
);
export const ErrorGetUniqueValues = ErrorMessage(
  'Missing one or more of required arguments: "arrays", and/or "intersections" when calling getUniqueValues()!'
);
export const ErrorHandleNestedElements = ErrorMessage('Missing element in handleNestedElements()!');
export const ErrorLoadFile = (path: string): string => {
  if (!path) throw Error('No string passed to ErrorLoadFile!');
  return ErrorMessage(`Could not find file: ${path}!`);
};
export const ErrorGetBackgroundColor = ErrorMessage('Error in getBackgroundColor()!');
export const ErrorGetBorderColor = ErrorMessage('Error in getBorderColor()!');
export const ErrorGetShadow = ErrorMessage('Error in getShadow()!');
export const ErrorMakeBorderWidthTokensMissingProps = ErrorMessage(
  'Missing "name" or "strokeWeight" properties in border width frame!'
);
export const ErrorMakeBorderWidthTokensNoChildren = ErrorMessage('Border Width has no children!');
export const ErrorMakeBorderWidthTokensNoFrame = ErrorMessage(
  'No frame for makeBorderWidthTokens()!'
);
export const ErrorMakeColorTokensNoChildren = ErrorMessage('Color tokens frame has no children!');
export const ErrorMakeColorTokensNoFrame = ErrorMessage('No frame for makeColorTokens()!');
export const ErrorMakeDelayTokensMissingProps = ErrorMessage(
  'Missing "name" or "characters" properties in Delay frame!'
);
export const ErrorMakeDelayTokensNoChildren = ErrorMessage('Delay frame has no children!');
export const ErrorMakeDelayTokensNoFrame = ErrorMessage('No frame for makeDelayTokens()!');
export const ErrorMakeDurationTokensMissingProps = ErrorMessage(
  'Missing "name" or "characters" properties in Duration frame!'
);
export const ErrorMakeDurationTokensNoChildren = ErrorMessage('Duration frame has no children!');
export const ErrorMakeDurationTokensNoFrame = ErrorMessage('No frame for makeDurationTokens()!');
export const ErrorMakeEasingTokensMissingProps = ErrorMessage(
  'Missing "name" or "characters" properties in Easing frame!'
);
export const ErrorMakeEasingTokensNoChildren = ErrorMessage('Easing frame has no children!');
export const ErrorMakeEasingTokensNoFrame = ErrorMessage('No frame for makeEasingTokens()!');
export const ErrorMakeFontSizeTokensMissingProps = ErrorMessage(
  'Missing "name" or "style" properties in font sizes frame!'
);
export const ErrorMakeFontSizeTokensMissingSize = ErrorMessage(
  'Missing required "style.fontSize" property!'
);
export const ErrorMakeFontSizeTokensNoChildren = ErrorMessage(
  'Font size frame is missing "children" array!'
);
export const ErrorMakeFontSizeTokensNoFrame = ErrorMessage('No frame for makeFontSizeTokens()!');
export const ErrorMakeFontSizeTokensNoSizing = ErrorMessage(
  'Missing "fontUnit" or "remSize" properties when calling makeFontSizeTokens()!'
);
export const ErrorMakeFontTokensMissingProps = ErrorMessage(
  'Missing "name" or "style" properties in font tokens frame!'
);
export const ErrorMakeLiteralFontTokensMissingProps = ErrorMessage(
  'Missing "character" property in font tokens frame!'
);
export const ErrorMakeFontTokensNoChildren = ErrorMessage(
  'Font tokens frame is missing "children" array!'
);
export const ErrorMakeFontTokensNoFrame = ErrorMessage('No frame for makeFontTokens()!');
export const ErrorMakeFontWeightTokensMissingProps = ErrorMessage(
  'Missing "name" or "style" properties in font weights frame!'
);
export const ErrorMakeFontWeightTokensMissingWeight = ErrorMessage(
  'Missing required "style.fontWeight" property!'
);
export const ErrorMakeFontWeightTokensNoChildren = ErrorMessage(
  'Font weights frame is missing "children" array!'
);
export const ErrorMakeFontWeightTokensNoFrame = ErrorMessage(
  'No frame for makeFontWeightTokens()!'
);
export const ErrorMakeLetterSpacingTokensMissingProps = ErrorMessage(
  'Missing "name" or "style" properties in letter spacing frame!'
);
export const ErrorMakeLineHeightTokensMissingProps = ErrorMessage(
  'Missing "name" or "style" properties in line height frame!'
);
export const ErrorMakeLetterSpacingTokensNoChildren = ErrorMessage(
  'Letter Spacing frame has no children!'
);
export const ErrorMakeLetterSpacingTokensNoFrame = ErrorMessage(
  'No frame for makeLetterSpacingTokens()!'
);
export const ErrorMakeLineHeightTokensNoChildren = ErrorMessage(
  'Line heights frame has no children!'
);
export const ErrorMakeLineHeightTokensNoName = ErrorMessage('Line heights frame is missing name!');
export const ErrorMakeLineHeightTokensNoStyle = ErrorMessage(
  'Line heights frame is missing style!'
);
export const ErrorMakeLineHeightTokensNoFrame = ErrorMessage(
  'No frame for makeLineHeightTokens()!'
);
export const ErrorMakeOpacityTokensMissingProps = ErrorMessage(
  'Missing "name" or "characters" properties in opacities frame!'
);
export const ErrorMakeOpacityTokensNoChildren = ErrorMessage('Opacities frame has no children!');
export const ErrorMakeOpacityTokensNoFrame = ErrorMessage('No frame for makeOpacityTokens()!');
export const ErrorMakeRadiusTokensMissingProps = ErrorMessage(
  'Missing "name"  property in radius frame!'
);
export const ErrorMakeRadiusTokensNoChildren = ErrorMessage('Radius frame has no children!');
export const ErrorMakeRadiusTokensNoFrame = ErrorMessage('No frame for makeRadiusTokens()!');
export const ErrorMakeShadowTokensMissingProps = ErrorMessage(
  'Missing "effects" property in shadow frame!'
);
export const ErrorMakeShadowTokensNoChildren = ErrorMessage('Shadow frame has no children!');
export const ErrorMakeShadowTokensNoFrame = ErrorMessage('No frame for makeShadowTokens()!');
export const ErrorMakeSpacingTokensMissingProps = ErrorMessage(
  'Missing "name" or "absoluteBoundingBox" properties in spacing frame!'
);
export const ErrorMakeSpacingTokensNoChildren = ErrorMessage('Spacing frame has no children!');
export const ErrorMakeSpacingTokensNoFrame = ErrorMessage('No frame for makeSpacingTokens()!');
export const ErrorMakeSpacingTokensNoUnits = ErrorMessage(
  'Missing "spacingUnit" or "remSize" properties when calling makeSpacingTokens()!'
);
export const ErrorMakeZindexTokensMissingProps = ErrorMessage(
  'Missing "name" or "characters" properties in Z index frame!'
);
export const ErrorMakeZindexTokensNoChildren = ErrorMessage('Z Index frame has no children!');
export const ErrorMakeZindexTokensNoFrame = ErrorMessage('No frame for makeZindexTokens()!');
export const ErrorNormalizeUnits = ErrorMessage('Missing arguments for normalizeUnits()!');
export const ErrorNormalizeUnitsNoRemSize = ErrorMessage(
  'Missing required "remSize" argument for normalizeUnits() when converting to rem/em!'
);
export const ErrorNormalizeUnitsUndefined = ErrorMessage(
  'arguments "rootSize" or "unitSize" are undefined!'
);
export const ErrorParseBackgroundColor = ErrorMessage('Error in parseBackgroundColor()!');
export const ErrorParseBorderColor = ErrorMessage('Error in parseBorderColor()!');
export const ErrorParseBorderRadius = ErrorMessage('Error in parseBorderRadius()!');
export const ErrorParseBorderWidth = ErrorMessage('Error in parseBorderWidth()!');
export const ErrorParseCliArgs = ErrorMessage('No arguments array passed to parseCliArgs()!');
export const ErrorParseCssFromElement = ErrorMessage(
  'Missing one or more of required arguments: "layoutElement", "textElement", "remSize", and/or "outputFormatTokens" when calling parseCssFromElement()!'
);
export const ErrorParseElement = ErrorMessage(
  'Missing one or more of required arguments: "element", and/or "remSize" when calling parseElement()!'
);
export const ErrorParseHeight = ErrorMessage('Error in parseHeight()!');
export const ErrorParsePadding = ErrorMessage('Error in parsePadding()!');
export const ErrorParseShadow = ErrorMessage('Error in parseShadow()!');
export const ErrorParseTypographyStylingFromElement = ErrorMessage(
  'Missing one or more of required arguments: "element", or "remSize" when calling parseTypographyStylingFromElement()!'
);
export const ErrorPrepFileComponent = ErrorMessage(
  'Missing required arguments in type, when calling prepComponent()!'
);
export const ErrorPrepFileCss = ErrorMessage(
  'Missing required arguments in type, when calling prepComponent()!'
);
export const ErrorPrepFileDescription = ErrorMessage(
  'Missing required arguments in type, when calling prepComponent()!'
);
export const ErrorPrepFileStorybook = ErrorMessage(
  'Missing required arguments in type, when calling prepComponent()!'
);
export const ErrorPrepFileStyledComponents = ErrorMessage(
  'Missing required arguments in type, when calling prepComponent()!'
);
export const ErrorPrepFileGraphicComponent = ErrorMessage(
  'Missing required arguments in type, when calling prepGraphicComponent()!'
);
export const ErrorPrepareWrite = ErrorMessage('No templates provided to prepareWrite()!');
export const ErrorProcessElements = ErrorMessage(
  'Missing one or more of required arguments: "elementsPage", "config", and/or "components"! Make sure you have a page called "Elements" in your Figma document.'
);
export const ErrorProcessElementsNoMainElement = ErrorMessage(
  'No MAIN_ELEMENT in processElements()!'
);
export const ErrorProcessGraphics = ErrorMessage(
  'Graphics page is undefined or empty! Make sure you have a page called "Graphics" in your Figma document.'
);
export const ErrorProcessGraphicsImageError = ErrorMessage(
  'Error when fetching graphics from Figma API!'
);
export const ErrorProcessGraphicElementsMap = ErrorMessage(
  'No graphics, or zero-length array, passed to processGraphicElementsMap()!'
);
export const ErrorProcessGraphicsNoImages = ErrorMessage('No images received from Figma API!');
export const ErrorProcessNestedCss = ErrorMessage(
  'No "css" string provided to processNestedCss()!'
);
export const ErrorRefresh = ErrorMessage('No path provided to refresh()!');
export const ErrorReplaceMediaQuery = ErrorMessage(
  'Missing one or more of required arguments: "str", and/or "match" when calling replaceMediaQuery()!'
);
export const ErrorRoundColor = ErrorMessage(
  'Error while rounding color value: Required argument "quantity" was not passed in!'
);
export const ErrorRoundColorValue = ErrorMessage(
  'Error while rounding color value: Scale value must be equal to or less than 255!'
);
export const ErrorSanitizeString = ErrorMessage('No string provided to sanitizeString()!');
export const ErrorSetupMediaQueryTokensMissingProps = ErrorMessage(
  'Missing "absoluteBoundingBox" property in media query frame!'
);
export const ErrorSetupMediaQueryTokensNoChildren = ErrorMessage(
  'Media Query frame has no children!'
);
export const ErrorSetupMediaQueryTokensNoFrame = ErrorMessage(
  'No frame for makeMediaQueryTokens()!'
);
export const ErrorSliceOutObjectFromFile = ErrorMessage('Error in sliceOutObjectFromFile()!');
export const ErrorToPascalCase = ErrorMessage(
  'Missing "str" argument when calling toPascalCase()!'
);
export const ErrorUpdateParsing = ErrorMessage('Error in updateParsing()!');
export const ErrorValidateConfig = ErrorMessage('Error when validating config!');
export const ErrorValidateConfigFileName = ErrorMessage(
  'Provided Figma file name in configuration is invalid!'
);
export const ErrorValidateConfigFolderName = ErrorMessage(
  'Provided Figma folder name in configuration is invalid!'
);
export const ErrorValidateBorderWidthUnit = ErrorMessage(
  'Received unrecognized "borderWidthUnit" argument, it must be "px" (default), "em" or "rem".'
);
export const ErrorValidateRadiusUnit = ErrorMessage(
  'Received unrecognized "radiusUnit" argument, it must be "px" (default), "em" or "rem".'
);
export const ErrorValidateShadowUnit = ErrorMessage(
  'Received unrecognized "shadowUnit" argument, it must be "px" (default), "em" or "rem".'
);
export const ErrorValidateDurationUnit = ErrorMessage(
  'Received unrecognized "durationUnit" argument, it must be "s" (default) or "ms".'
);
export const ErrorValidateConfigFontUnit = ErrorMessage(
  'Received unrecognized "fontUnit" argument, it must be "rem" (default), "em" or "px".'
);
export const ErrorValidateConfigLetterSpacingUnit = ErrorMessage(
  'Received unrecognized "letterSpacingUnit" argument, it must be "em" (default) or "px".'
);
export const ErrorValidateConfigLineHeightUnit = ErrorMessage(
  'Received unrecognized "lineHeightUnit" argument, it must be "unitless" (default), "em", "rem" or "px".'
);
export const ErrorValidateConfigOpacitiesUnit = ErrorMessage(
  'Received unrecognized "opacitiesUnit" argument, it must be "float" (default) or "percent".'
);
export const ErrorValidateConfigOutputDataTypeToken = ErrorMessage(
  'Received unrecognized "outputDataTypeToken" arguments, it must be null (default), or "enum".'
);
export const ErrorValidateConfigOutputFormatColors = ErrorMessage(
  'Received unrecognized "outputFormatColors" arguments, it must be "rgba" (default) or "hex".'
);
export const ErrorValidateConfigOutputFormatCss = ErrorMessage(
  'Received unrecognized "outputFormatCss" arguments, it must be "ts" (default), "mjs" or "js".'
);
export const ErrorValidateConfigOutputFormatDesc = ErrorMessage(
  'Received unrecognized "outputFormatDescription" arguments, it must be "md" (default), or "txt".'
);
export const ErrorValidateConfigOutputFormatElements = ErrorMessage(
  'Received unrecognized "outputFormatElements" arguments, it must be "tsx" (default), or "jsx".'
);
export const ErrorValidateConfigOutputFormatGraphics = ErrorMessage(
  'Received unrecognized "outputFormatGraphics" arguments, it must be "svg" (default) or "png".'
);
export const ErrorValidateConfigOutputFormatStorybook = ErrorMessage(
  'Received unrecognized "outputFormatStorybook" arguments, it must be "js" (default), "ts" or "mdx".'
);
export const ErrorValidateConfigOutputFormatTokens = ErrorMessage(
  'Received unrecognized "outputFormatTokens" arguments, it must be "ts" (default), "mjs", "js", "json", or "css".'
);
export const ErrorValidateConfigOutputScaleGraphics = ErrorMessage(
  'Argument "outputScaleGraphics" is invalid!'
);
export const ErrorValidateConfigSpacingUnit = ErrorMessage(
  'Received unrecognized "spacingUnit" argument, it must be "rem" (default), "em" or "px".'
);
export const ErrorValidateConfigTemplatePathReact = ErrorMessage(
  'Argument "templatePathReact" cannot be empty!'
);
export const ErrorValidateConfigTemplatePathStorybook = ErrorMessage(
  'Argument "templatePathStorybook" cannot be empty!'
);
export const ErrorValidateConfigTemplatePathStyled = ErrorMessage(
  'Argument "templatePathStyled" cannot be empty!'
);
export const ErrorValidateConfigTemplatePathGraphic = ErrorMessage(
  'Argument "templatePathGraphic" cannot be empty!'
);
export const ErrorWrite = ErrorMessage('Error while attempting to write file!');
export const ErrorWriteBaseJson = ErrorMessage('Error while attempting to write Figma JSON!');
export const ErrorWriteElements = ErrorMessage(
  'Missing "elements" and/or "config" properties when calling writeElements()!'
);
export const ErrorWriteFile = ErrorMessage(
  'Missing required arguments to correctly run writeFile()!'
);
export const ErrorWriteFileWrongType = ErrorMessage('Provided invalid file type to writeFile()!');
export const ErrorWriteGraphics = ErrorMessage(
  'Missing "fileList" and/or "config" argument when calling writeGraphics()!'
);
export const ErrorWriteGraphicElementsMap = ErrorMessage(
  'Missing one or more of required arguments "folder", "filePath", and/or "fileContent" when calling writeGraphicElementsMap()!'
);
export const ErrorWriteTokens = ErrorMessage(
  'Less than one token provided to writeTokens()! Make sure you have a page called "Design Tokens" in your Figma document.'
);
export const ErrorWriteTokensNoSettings = ErrorMessage(
  'Missing "settings" argument/object when attempting to write tokens!'
);
