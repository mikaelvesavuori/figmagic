import { Config } from '../../../contracts/Config';

import { ErrorParseCliArgs } from '../../../frameworks/errors/errors';

interface CliArguments {
  [key: string]: (val: string) => unknown;
}

/**
 * @description Parse CLI arguments and return config object
 */
export function parseCliArgs(argsArray: string[]): Config {
  if (!argsArray) throw new Error(ErrorParseCliArgs);
  if (argsArray.length === 0) return {} as Config;

  // deep partial Config type
  const config: any = {};

  const setConfigValue = <ValueType = unknown>(key: keyof Config, value: ValueType): void => {
    config[key] = value;
  };

  const cliArguments: CliArguments = {
    '--debug': () => setConfigValue('debugMode', true),
    '-d': () => setConfigValue('debugMode', true),
    '--fontUnit': (val: string) => setConfigValue('fontUnit', val.toLowerCase()),
    '-fu': (val: string) => setConfigValue('fontUnit', val.toLowerCase()),
    '--letterSpacingUnit': (val: string) => setConfigValue('letterSpacingUnit', val.toLowerCase()),
    '-lsu': (val: string) => setConfigValue('letterSpacingUnit', val.toLowerCase()),
    '--opacitiesUnit': (val: string) => setConfigValue('opacitiesUnit', val.toLowerCase()),
    '-ou': (val: string) => setConfigValue('opacitiesUnit', val.toLowerCase()),
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
    '--remSize': (val: string) => setConfigValue('remSize', parseInt(val)),
    '-rem': (val: string) => setConfigValue('remSize', parseInt(val)),
    '--forceUpdate': () =>
      setConfigValue('skipFileGeneration', {
        ...config.skipFileGeneration,
        forceUpdate: true
      }),
    '-force': () =>
      setConfigValue('skipFileGeneration', {
        ...config.skipFileGeneration,
        forceUpdate: true
      }),
    '--skipCss': () =>
      setConfigValue('skipFileGeneration', {
        ...config.skipFileGeneration,
        skipCss: true
      }),
    '-nocss': () =>
      setConfigValue('skipFileGeneration', {
        ...config.skipFileGeneration,
        skipCss: true
      }),
    '--skipDescription': () =>
      setConfigValue('skipFileGeneration', {
        ...config.skipFileGeneration,
        skipDescription: true
      }),
    '-nodesc': () =>
      setConfigValue('skipFileGeneration', {
        ...config.skipFileGeneration,
        skipDescription: true
      }),
    '--skipReact': () =>
      setConfigValue('skipFileGeneration', {
        ...config.skipFileGeneration,
        skipReact: true
      }),
    '-noreact': () =>
      setConfigValue('skipFileGeneration', {
        ...config.skipFileGeneration,
        skipReact: true
      }),
    '--skipStorybook': () =>
      setConfigValue('skipFileGeneration', {
        ...config.skipFileGeneration,
        skipStorybook: true
      }),
    '-nostory': () =>
      setConfigValue('skipFileGeneration', {
        ...config.skipFileGeneration,
        skipStorybook: true
      }),
    '--skipStyled': () =>
      setConfigValue('skipFileGeneration', {
        ...config.skipFileGeneration,
        skipStyled: true
      }),
    '-nostyled': () =>
      setConfigValue('skipFileGeneration', {
        ...config.skipFileGeneration,
        skipStyled: true
      }),
    '--spacingUnit': (val: string) => setConfigValue('spacingUnit', val.toLowerCase()),
    '-s': (val: string) => setConfigValue('spacingUnit', val.toLowerCase()),
    '--syncElements': () => setConfigValue('syncElements', true),
    '-se': () => setConfigValue('syncElements', true),
    '--syncGraphics': () => setConfigValue('syncGraphics', true),
    '-sg': () => setConfigValue('syncGraphics', true),
    '--syncTokens': () => setConfigValue('syncTokens', true),
    '-st': () => setConfigValue('syncTokens', true),
    '--templatePathReact': (val: string) =>
      setConfigValue('templates', {
        ...config.templates,
        templatePathReact: val
      }),
    '-tpreact': (val: string) =>
      setConfigValue('templates', {
        ...config.templates,
        templatePathReact: val
      }),
    '--templatePathStorybook': (val: string) =>
      setConfigValue('templates', {
        ...config.templates,
        templatePathStorybook: val
      }),
    '-tpstory': (val: string) =>
      setConfigValue('templates', {
        ...config.templates,
        templatePathStorybook: val
      }),
    '--templatePathStyled': (val: string) =>
      setConfigValue('templates', {
        ...config.templates,
        templatePathStyled: val
      }),
    '-tpstyled': (val: string) =>
      setConfigValue('templates', {
        ...config.templates,
        templatePathStyled: val
      }),
    '--templatePathGraphic': (val: string) =>
      setConfigValue('templates', {
        ...config.templates,
        templatePathGraphic: val
      }),
    '-tpgraphic': (val: string) =>
      setConfigValue('templates', {
        ...config.templates,
        templatePathGraphic: val
      }),
    '--token': (val: string) => setConfigValue('token', val),
    '-t': (val: string) => setConfigValue('token', val),
    '--unitlessPrecision': (val: string) => setConfigValue('unitlessPrecision', parseInt(val, 10)),
    '-up': (val: string) => setConfigValue('unitlessPrecision', parseInt(val, 10)),
    '--url': (val: string) => setConfigValue('url', val),
    '-u': (val: string) => setConfigValue('url', val),
    '--usePostscriptFontNames': () => setConfigValue('usePostscriptFontNames', true),
    '-ps': () => setConfigValue('usePostscriptFontNames', true)
  };

  argsArray.forEach((arg: string, index: number) => {
    if (cliArguments.hasOwnProperty(arg)) {
      cliArguments[arg](argsArray[index + 1]);
    }
  });

  return config as Config;
}
