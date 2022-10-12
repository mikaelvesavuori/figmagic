import { Config } from '../../../contracts/Config';

import { ErrorParseCliArgs } from '../../../frameworks/errors/errors';

interface CliArguments {
  [key: string]: (val: string) => unknown;
}

/**
 * @description Parse CLI arguments and return config object
 */
export function parseCliArgs(argsArray: string[]): Config {
  if (!argsArray) throw Error(ErrorParseCliArgs);
  if (argsArray.length === 0) return {} as Config;

  const config: Record<string, any> = {};

  const setConfigValue = <ValueType = unknown>(key: keyof Config, value: ValueType): void => {
    config[key] = value;
  };
  const setConfigChildValue = (key: keyof Config, childKey: string, value: unknown): void => {
    config[key] = {
      ...config[key],
      [childKey]: value
    };
  };

  const cliArguments: CliArguments = {
    '--debug': () => setConfigValue('debugMode', true),
    '-d': () => setConfigValue('debugMode', true),
    '--noCamelizeTokenNames': () => setConfigValue('camelizeTokenNames', false),
    '-cml': () => setConfigValue('camelizeTokenNames', false),
    '--borderWidthUnit': (val: string) => setConfigValue('borderWidthUnit', val.toLowerCase()),
    '-bwu': (val: string) => setConfigValue('borderWidthUnit', val.toLowerCase()),
    '--radiusUnit': (val: string) => setConfigValue('radiusUnit', val.toLowerCase()),
    '-ru': (val: string) => setConfigValue('radiusUnit', val.toLowerCase()),
    '--shadowUnit': (val: string) => setConfigValue('shadowUnit', val.toLowerCase()),
    '-su': (val: string) => setConfigValue('shadowUnit', val.toLowerCase()),
    '--fontUnit': (val: string) => setConfigValue('fontUnit', val.toLowerCase()),
    '-fu': (val: string) => setConfigValue('fontUnit', val.toLowerCase()),
    '--letterSpacingUnit': (val: string) => setConfigValue('letterSpacingUnit', val.toLowerCase()),
    '-lsu': (val: string) => setConfigValue('letterSpacingUnit', val.toLowerCase()),
    '--lineHeightUnit': (val: string) => setConfigValue('lineHeightUnit', val.toLowerCase()),
    '-lhu': (val: string) => setConfigValue('lineHeightUnit', val.toLowerCase()),
    '--opacitiesUnit': (val: string) => setConfigValue('opacitiesUnit', val.toLowerCase()),
    '-ou': (val: string) => setConfigValue('opacitiesUnit', val.toLowerCase()),
    '--durationUnit': (val: string) => setConfigValue('durationUnit', val.toLowerCase()),
    '-du': (val: string) => setConfigValue('durationUnit', val.toLowerCase()),
    '--figmaData': (val: string) => setConfigValue('figmaData', val),
    '-data': (val: string) => setConfigValue('figmaData', val),
    '--figmagicFolder': (val: string) => setConfigValue('figmagicFolder', val),
    '-base': (val: string) => setConfigValue('figmagicFolder', val),
    '--outputFolderElements': (val: string) => setConfigValue('outputFolderElements', val),
    '-elements': (val: string) => setConfigValue('outputFolderElements', val),
    '--outputFolderGraphics': (val: string) => setConfigValue('outputFolderGraphics', val),
    '-graphics': (val: string) => setConfigValue('outputFolderGraphics', val),
    '--outputFolderTokens': (val: string) => setConfigValue('outputFolderTokens', val),
    '-tokens': (val: string) => setConfigValue('outputFolderTokens', val),
    '--outputFormatColors': (val: string) =>
      setConfigValue('outputFormatColors', val.toLowerCase()),
    '-fcol': (val: string) => setConfigValue('outputFormatColors', val.toLowerCase()),
    '--outputFormatCss': (val: string) => setConfigValue('outputFormatCss', val.toLowerCase()),
    '-fc': (val: string) => setConfigValue('outputFormatCss', val.toLowerCase()),
    '--outputFormatDesc': (val: string) =>
      setConfigValue('outputFormatDescription', val.toLowerCase()),
    '-fd': (val: string) => setConfigValue('outputFormatDescription', val.toLowerCase()),
    '--outputFormatElements': (val: string) =>
      setConfigValue('outputFormatElements', val.toLowerCase()),
    '-fe': (val: string) => setConfigValue('outputFormatElements', val.toLowerCase()),
    '--outputFormatGraphics': (val: string) =>
      setConfigValue('outputFormatGraphics', val.toLowerCase()),
    '-fg': (val: string) => setConfigValue('outputFormatGraphics', val.toLowerCase()),
    '--outputFormatStorybook': (val: string) =>
      setConfigValue('outputFormatStorybook', val.toLowerCase()),
    '-fs': (val: string) => setConfigValue('outputFormatStorybook', val.toLowerCase()),
    '--outputFormatTokens': (val: string) =>
      setConfigValue('outputFormatTokens', val.toLowerCase()),
    '-ft': (val: string) => setConfigValue('outputFormatTokens', val.toLowerCase()),
    '--outputGraphicElements': () => setConfigValue('outputGraphicElements', true),
    '-oge': () => setConfigValue('outputGraphicElements', true),
    '--outputGraphicElementsMap': () => setConfigValue('outputGraphicElementsMap', true),
    '-ogm': () => setConfigValue('outputGraphicElementsMap', true),
    '--outputScaleGraphics': (val: string) => setConfigValue('outputScaleGraphics', parseInt(val)),
    '-scale': (val: string) => setConfigValue('outputScaleGraphics', parseInt(val)),
    '--outputDataTypeToken': (val: string) =>
      setConfigValue('outputDataTypeToken', val.toLowerCase()),
    '-tokentype': (val: string) => setConfigValue('outputDataTypeToken', val.toLowerCase()),
    '--recompileLocal': () => setConfigValue('recompileLocal', true),
    '-local': () => setConfigValue('recompileLocal', true),
    '--remSize': (val: string) => setConfigValue('remSize', parseInt(val, 10)),
    '-rem': (val: string) => setConfigValue('remSize', parseInt(val, 10)),
    '--forceUpdate': () => setConfigChildValue('skipFileGeneration', 'forceUpdate', true),
    '-force': () => setConfigChildValue('skipFileGeneration', 'forceUpdate', true),
    '--skipCss': () => setConfigChildValue('skipFileGeneration', 'skipCss', true),
    '-nocss': () => setConfigChildValue('skipFileGeneration', 'skipCss', true),
    '--skipDescription': () => setConfigChildValue('skipFileGeneration', 'skipDescription', true),
    '-nodesc': () => setConfigChildValue('skipFileGeneration', 'skipDescription', true),
    '--skipReact': () => setConfigChildValue('skipFileGeneration', 'skipReact', true),
    '-noreact': () => setConfigChildValue('skipFileGeneration', 'skipReact', true),
    '--skipStorybook': () => setConfigChildValue('skipFileGeneration', 'skipStorybook', true),
    '-nostory': () => setConfigChildValue('skipFileGeneration', 'skipStorybook', true),
    '--skipStyled': () => setConfigChildValue('skipFileGeneration', 'skipStyled', true),
    '-nostyled': () => setConfigChildValue('skipFileGeneration', 'skipStyled', true),
    '--spacingUnit': (val: string) => setConfigValue('spacingUnit', val.toLowerCase()),
    '-s': (val: string) => setConfigValue('spacingUnit', val.toLowerCase()),
    '--syncElements': () => setConfigValue('syncElements', true),
    '-se': () => setConfigValue('syncElements', true),
    '--syncGraphics': () => setConfigValue('syncGraphics', true),
    '-sg': () => setConfigValue('syncGraphics', true),
    '--syncTokens': () => setConfigValue('syncTokens', true),
    '-st': () => setConfigValue('syncTokens', true),
    '--templatePathReact': (val: string) =>
      setConfigChildValue('templates', 'templatePathReact', val),
    '-tpreact': (val: string) => setConfigChildValue('templates', 'templatePathReact', val),
    '--templatePathStorybook': (val: string) =>
      setConfigChildValue('templates', 'templatePathStorybook', val),
    '-tpstory': (val: string) => setConfigChildValue('templates', 'templatePathStorybook', val),
    '--templatePathStyled': (val: string) =>
      setConfigChildValue('templates', 'templatePathStyled', val),
    '-tpstyled': (val: string) => setConfigChildValue('templates', 'templatePathStyled', val),
    '--templatePathGraphic': (val: string) =>
      setConfigChildValue('templates', 'templatePathGraphic', val),
    '-tpgraphic': (val: string) => setConfigChildValue('templates', 'templatePathGraphic', val),
    '--token': (val: string) => setConfigValue('token', val),
    '-t': (val: string) => setConfigValue('token', val),
    '--tokensRelativeImportPrefix': (val: string) =>
      setConfigValue('tokensRelativeImportPrefix', val),
    '-tip': (val: string) => setConfigValue('tokensRelativeImportPrefix', val),
    '--unitlessPrecision': (val: string) => setConfigValue('unitlessPrecision', parseInt(val, 10)),
    '-up': (val: string) => setConfigValue('unitlessPrecision', parseInt(val, 10)),
    '--url': (val: string) => setConfigValue('url', val),
    '-u': (val: string) => setConfigValue('url', val),
    '--usePostscriptFontNames': () => setConfigValue('usePostscriptFontNames', true),
    '-ps': () => setConfigValue('usePostscriptFontNames', true),
    '--useLiteralFontFamilies': () => setConfigValue('useLiteralFontFamilies', true),
    '-lff': () => setConfigValue('useLiteralFontFamilies', true),
    '--versionName': (val: string) => setConfigValue('versionName', val),
    '-v': (val: string) => setConfigValue('versionName', val)
  };

  argsArray.forEach((arg: string, index: number) => {
    if (cliArguments.hasOwnProperty(arg)) {
      cliArguments[arg](argsArray[index + 1]);
    }
  });

  return config as Config;
}
